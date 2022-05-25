//////////////////////////////////////////////////////////
////  Instagram Feed
//////////////////////////////////////////////////////////

// https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-profiles-and-media

const InstagramFeed = (() => {

  let debug = true;
  let info = { name : 'Instagram Feed', version : '1.0' };

  let tools = new Tools();

  let targetElementElement = '.js--instagram-feed';
  let blockElement = 'instagram-feed';
  let feeds = {};

  //////////////////////////////////////////////////////////
  ////  Print Media
  //////////////////////////////////////////////////////////

  const initializeGlider = () => {
    console.log( 'initializeGlider', {} );
  };

  const renderFeedMarkup = ( $media ) => {
    console.log( 'renderFeedMarkup', $media );
  };

  const printMedia = ( $media = [], $account = '' ) => {

    if ( debug ) console.log( 'printMedia() :: Initialized' );

    if ( $media.length && $account ) {
      ( document.querySelectorAll(`[data-instagram-feed-account-name='${$account}']`) || [] ).forEach( element => {
        element.innerHTML = renderFeedMarkup(products);
      });
    }

    if ( debug ) console.log( 'printMedia() :: Complete' );

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
    if ( debug ) console.log( '[ InstagramFeed.init() ] Start' );
    main();
    if ( debug ) console.log( '[ InstagramFeed.init() ] End' );
  };

  //////////////////////////////////////////////////////////
  ////  Returned Methods
  //////////////////////////////////////////////////////////

  return {
    info,
    init
  };

});
