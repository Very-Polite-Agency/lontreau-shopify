//////////////////////////////////////////////////////////
////  Instagram Feed
//////////////////////////////////////////////////////////

// https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-profiles-and-media

const InstagramFeed = (() => {

  let debug = true;
  let info = { name : 'Instagram Feed', version : '1.0' };

  let vpcreds = {
    pass: '21waterst',
    user: 'verypoliteagency'
  };

  let tools = new Tools();

  let targetElementElement = '.js--instagram-feed';
  let blockName = 'instagram-feed';
  let feeds = {};
  let instagramGlider = {
    interval: null,
    id: blockName,
    glider: {},
    count: 0
  };

  //////////////////////////////////////////////////////////
  ////  Initialize Glider
  //////////////////////////////////////////////////////////

  const initializeGlider = () => {

    instagramGlider.glider = new Glide( `#${instagramGlider.id}`, {
      animationTimingFunc: 'ease-in-out',
      animationDuration: 280,
      autoplay: 3200,
      breakpoints: {
        9999: {
          // up to 1200
          focusAt: 'center',
          gap: 32,
          peek: { before: 64, after: 64 },
          perView: 4,
        },
        1399: {
          // up to 992
          focusAt: 'center',
          gap: 32,
          peek: { before: 64, after: 64 },
          perView: 3,
        },
        991: {
          // up to 992
          focusAt: 'center',
          gap: 32,
          peek: { before: 64, after: 64 },
          perView: 2,
        },
        767: {
          // up to 576
          focusAt: 'center',
          gap: 32,
          peek: { before: 64, after: 64 },
          perView: 1,
        },
      },
      gap: 32,
      peek: 0,
      hoverpause: true,
      type: 'carousel',
      rewind: true,
      throttle: 50
    });

    instagramGlider.glider.on( 'mount.after', function(event) {
      setTimeout( function() {
        instagramGlider.glider.update();
      }, 250 );
    });

    ( document.querySelectorAll(`[data-target="#${instagramGlider.id}"].next`) || [] ).forEach( button => {
      button.addEventListener('click', function () {
        instagramGlider.glider.go('>');
      });
    });

    ( document.querySelectorAll(`[data-target="#${instagramGlider.id}"].prev`) || [] ).forEach( button => {
      button.addEventListener('click', function () {
        instagramGlider.glider.go('<');
      });
    });

    instagramGlider.glider.mount();

  };

  //////////////////////////////////////////////////////////
  ////  Render Feed Markup
  //////////////////////////////////////////////////////////

  const renderFeedMarkup = ( account = '', media = [] ) => {
    if ( debug ) console.log( 'renderFeedMarkup ::', media );
    instagramGlider.count = 0;
    return `
      <div class="glide" id="${instagramGlider.id}" data-glide-style="${blockName}">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            ${media.map( item =>
              `${renderFeedCardMarkup( account, item )}`
            ).join('')}
          </ul>
        </div>
      </div>
    `;
  };

  //////////////////////////////////////////////////////////
  ////  Render Feed Card Markup
  //////////////////////////////////////////////////////////

  function renderFeedCardMarkup( account = '', item = {} ) {

    if ( debug ) console.log( 'renderFeedCardMarkup ::', item );
    let { id = '', media_type = '', media_url = '', permalink = '' } = item;
    let template = '';

    if ( ( "CAROUSEL_ALBUM" == media_type || "IMAGE" == media_type ) && instagramGlider.count < feeds[account].limit ) {
      template = `
        <li class="glide__slide">
          <div class="${blockName}__item" id="${id}" data-count="${instagramGlider.count}">
            <a class="${blockName}__item-link" href="${permalink}" target="_blank">
              <div class="${blockName}__item-image lazyload-item lazyload-item--image lazypreload lazyload-item--inline lazyload" data-bg="${media_url}"></div>
            </a>
          </div>
        </li>
      `;
      instagramGlider.count++;
    }

    return template;

  };

  //////////////////////////////////////////////////////////
  ////  Print Media
  //////////////////////////////////////////////////////////

  const printMedia = ( account = '', media = [] ) => {

    if ( debug ) console.log( 'printMedia() :: Initialized', { media, account } );

    if ( media.length && account ) {
      ( document.querySelectorAll(`[data-instagram-feed-account='${account}']`) || [] ).forEach( element => {
        element.innerHTML = renderFeedMarkup( account, media );
        initializeGlider();
      });
    }

    if ( debug ) console.log( 'printMedia() :: Complete' );

  };

  //////////////////////////////////////////////////////////
  ////  Get Media
  //////////////////////////////////////////////////////////

  const getMedia = ( $account = 'not-set', $token = 'not-set' ) => {

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
      printMedia( $account, json.data );

    })
    .catch(err => console.log( 'getMedia( $account, $token ) Error', err ));

  };

  //////////////////////////////////////////////////////////
  ////  Get Token
  //////////////////////////////////////////////////////////

  const getToken = ( $account ) => {

    fetch( 'https://very-polite-instagram-feed.herokuapp.com/token?userAccount=' + $account )
    .then( res => {
      if ( debug ) console.log('getToken( $account ) :: Response', res );
      res.json();
    })
    .then( json => {
      if ( debug ) console.log('getToken( $account ) :: JSON', json );
      getMedia( $account, json.token );
    })
    .catch( err => console.log(err) );

  };

  //////////////////////////////////////////////////////////
  ////  Get Feeds
  //////////////////////////////////////////////////////////

  const getFeeds = () => {
    ( document.querySelectorAll(`[data-instagram-feed-account]`) || [] ).forEach( element => {
       let limit = parseInt( element.dataset.instagramFeedLimit ) || 6;
       let account = element.dataset.instagramFeedAccount || false;
       if ( account && limit ) {
        feeds[account] = { account, element, limit };
       }
    });
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
          printMedia( account, feedData.data );
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
    init,
    feeds
  };

});
