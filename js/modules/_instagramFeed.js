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
      autoplay: 3500,
      breakpoints: {
        9999: {
          // up to 10000
          focusAt: 0,
          gap: 20,
          peek: { before: 0, after: 64 },
          perView: 5,
        },
        1399: {
          // up to 1400
          focusAt: 0,
          gap: 20,
          peek: { before: 0, after: 64 },
          perView: 4,
        },
        991: {
          // up to 992
          focusAt: 0,
          gap: 20,
          peek: { before: 0, after: 64 },
          perView: 3,
        },
        767: {
          // up to 768
          focusAt: 0,
          gap: 20,
          peek: { before: 0, after: 64 },
          perView: 2,
        }
      },
      gap: 20,
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
    if ( debug ) console.log( 'renderFeedMarkup ::', { account, media } );
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

    if ( debug ) console.log( 'renderFeedCardMarkup ::', { account, item } );

    let { id = '', media_type = '', media_url = '', permalink = '' } = item;
    let template = '';

    if ( ( "CAROUSEL_ALBUM" == media_type || "IMAGE" == media_type ) && instagramGlider.count < feeds[account].limit ) {
      template = `
        <li class="glide__slide">
          <div class="${blockName}__item" id="${id}" data-count="${instagramGlider.count}">
            <a class="${blockName}__item-link link" href="${permalink}" target="_blank">
              <div class="${blockName}__item-image lazyload-item lazyload-item--image lazypreload lazyload-item--background lazyload" data-bg="${media_url}"></div>
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

    if ( debug ) console.log( 'printMedia ::', { account, media } );

    if ( media.length && account ) {
      ( document.querySelectorAll(`[data-instagram-feed-account='${account}']`) || [] ).forEach( element => {
        element.innerHTML = renderFeedMarkup( account, media );
        initializeGlider();
      });
    }

    if ( debug ) console.log( 'printMedia :: Complete' );

  };

  //////////////////////////////////////////////////////////
  ////  Get Media
  //////////////////////////////////////////////////////////

  const getMedia = ( account = 'not-set', token = 'not-set' ) => {

    let fetchURL = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${token}`;

    console.log( 'getMedia ::', { fetchURL } );

    fetch( fetchURL )
    .then( res => res.json())
    .then( json => {

      if ( debug ) console.log('getMedia:', json );

      let localData = {
        account: account,
        date: Date.now(),
        data: json.data
      };

      tools.setLocalStorage( `very-polite-instagram-feed--${account}`, JSON.stringify(localData) );
      printMedia( account, json.data );

    })
    .catch(err => console.log( 'getMedia( $account, $token ) Error', err ));

  };

  //////////////////////////////////////////////////////////
  ////  Get Token
  //////////////////////////////////////////////////////////

  const getToken = ( account ) => {

    let fetchURL = `https://very-polite-instagram-feed.herokuapp.com/token?userAccount=${account}`;

    console.log( 'getToken ::', { fetchURL } );

    fetch( fetchURL )
    .then( res => res.json() )
    .then( json => {
      if ( debug ) console.log('getToken( $account ) :: JSON', json );
      getMedia( account, json.token );
    })
    .catch( err => console.log(err) );

  };

  //////////////////////////////////////////////////////////
  ////  Get Feeds
  //////////////////////////////////////////////////////////

  const getFeeds = () => {
    ( document.querySelectorAll('.js--instagram-feed') || [] ).forEach( element => {
       let limit = parseInt( element.dataset.instagramFeedLimit ) || 6;
       let account = element.dataset.instagramFeedAccount || false;
       console.log( 'getFeeds ::', { account, limit } );
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

      console.log( 'main ::', account );

      if ( tools.getLocalStorageValueByKey(`very-polite-instagram-feed--${account}`) ) {

        let feedData = JSON.parse( tools.getLocalStorageValueByKey(`very-polite-instagram-feed--${account}`) );
        let millisecondsDifference = Date.now() - feedData.date;
        let minutesDifference = ( millisecondsDifference / 60000 ).toFixed(2);

        if ( minutesDifference > 30 ) {
          console.log( 'GREATER than 30 minutes since last check, get new token' );
          getToken( account );
        } else {
          console.log( 'LESS than 30 minutes since last check, print from local storage' );
          printMedia( account, feedData.data );
        }

      } else {
        console.log( 'Local storage does not exist, get token and then print media.' );
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
