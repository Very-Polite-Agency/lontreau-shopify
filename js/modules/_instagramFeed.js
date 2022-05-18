//////////////////////////////////////////////////////////
////  Instagram Feed
//////////////////////////////////////////////////////////

// https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-profiles-and-media

const InstagramFeed = (() => {

  let debug = false;
  let info = { name : 'Instagram Feed', version : '1.0' };

  let tools = new Tools();

  let targetElementElement = '.js--instagram-feed';
  let feeds = {};

  //////////////////////////////////////////////////////////
  ////  Print Media
  //////////////////////////////////////////////////////////

  const printMedia = ( $media = [], $account = '' ) => {

    if ( debug ) console.log( '[ printMedia() ] Start' );

    if ( $media.length && $account ) {

      let elements = document.querySelectorAll(`[data-instagram-feed-account-name='${$account}']`);

      for ( let i = 0; i < elements.length; i++ ) {
        let count = 1;
        for ( let j = 0; j < $media.length; j++ ) {
          let item = $media[j];
          if ( debug ) console.log(item);
          let isImage = ('IMAGE' == item.media_type) ? true : false;
          let notAboveLimit = (count <= feeds[$account].limit ) ? true : false;
          if ( notAboveLimit && isImage ) {
            elements[i].querySelector(`[data-count='${count}'] .instagram-feed__link`).setAttribute( 'href', item.permalink );
            elements[i].querySelector(`[data-count='${count}'] .instagram-feed__image`).setAttribute( 'data-bg', item.media_url );
            elements[i].querySelector(`[data-count='${count}'] .instagram-feed__image`).classList.add( 'lazyload', 'lazypreload' );
            count++;
          }
        }
      }

    }

    if ( debug ) console.log( '[ printMedia() ] End' );

  };

  //////////////////////////////////////////////////////////
  ////  Get Media
  //////////////////////////////////////////////////////////

  const getMedia = ( $account, $token ) => {

    let getURL = 'https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=' + $token;

    fetch( getURL )
    .then(res => res.json())
    .then(json => {

      if ( debug ) console.log('getMedia:', json );

      let localData = {
        account: $account,
        date: Date.now(),
        data: json.data
      };

      tools.setLocalStorage( `very-polite-instagram-feed--${$account}`, JSON.stringify(localData) );

      printMedia( json.data, $account );

    })
    .catch(err => console.log( 'getMedia( $account, $token ) Error', err ));

  };

  //////////////////////////////////////////////////////////
  ////  Get Token
  //////////////////////////////////////////////////////////

  const getToken = ( $account ) => {

    fetch( 'https://very-polite-instagram-feed.herokuapp.com/token?userAccount=' + $account )
    .then(res => res.json())
    .then(json => {
      if ( debug ) console.log('getToken( $account ) fired!', json );
      getMedia( $account, json.token );
    })
    .catch(err => console.log(err));

  };

  //////////////////////////////////////////////////////////
  ////  Get Feeds
  //////////////////////////////////////////////////////////

  const getFeeds = () => {

    let elements = document.getElementsByClassName('js--instagram-feed');

    for ( let i = 0; i < elements.length; i++ ) {
      let limit = parseInt( elements[i].getAttribute('data-instagram-feed-post-limit') ) || 6;
      let account = elements[i].getAttribute('data-instagram-feed-account-name') || false;
      if ( account && limit ) {
        feeds[account] = { element: elements[i], limit: limit };
      }
    }

    if ( debug ) console.log( 'getFeeds() complete', feeds );

  };

  //////////////////////////////////////////////////////////
  ////  Main
  //////////////////////////////////////////////////////////

  const main = () => {

    getFeeds();

    for ( const account in feeds ) {

      if ( tools.getLocalStorageValueByKey(`very-polite-instagram-feed--${account}`)) {

        let feedData = JSON.parse( tools.getLocalStorageValueByKey(`very-polite-instagram-feed--${account}`) );
        let millisecondsDifference = Date.now() - feedData.date;
        let minutesDifference = ( millisecondsDifference / 60000 ).toFixed(2);

        if ( minutesDifference > 30 ) {
          getToken( account );
        } else {
          if ( debug ) console.log( 'localStorage fired!' );
          printMedia( feedData.data, account );
        }

      } else {
        getToken( account );
      }

    }

  };

  //////////////////////////////////////////////////////////
  ////  Public Method | Initialize
  //////////////////////////////////////////////////////////

  const init = () => {
    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );
    main();
    if ( debug ) console.log( `${info.name}.init() Finished` );
  };

  //////////////////////////////////////////////////////////
  ////  Returned Methods
  //////////////////////////////////////////////////////////

  return {
    info,
    init
  };

});
