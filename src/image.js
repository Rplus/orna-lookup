let imgs = {
  proxy: {
    good: [],
    dead: [],
  },
  origin: {
    good: [],
    dead: [],
  },
  checing: [],
};

export function getImgSrc(item, thumbnail) {
  if (!item) { return; }

  return getOrnaThumbImgSrc(item.img);

  // if (thumbnail) {
  //   return getOrnaThumbImgSrc(item.img, 16);
  //   // return getProxyImgSrc(item.img, 16);
  // }

  // return (
  //   (item.deadProxyImage || true)
  //     ? getOriginImgSrc(item.img)
  //     : getProxyImgSrc(item.img)
  // );
}

export function getImgBgStyle(item) {
  // return `--bg: url(${getImgSrc(item)}); --bg-fallback: url(${getImgSrc(item, 's')})`;
  return `--bg: url(${getImgSrc(item)});`;
}

export function checkingImg(item) {
  let { id, image } = item;

  if (
    imgs.proxy.good.includes(id) ||
    imgs.origin.dead.includes(id)
  ) {
    return;
  }

  return new Promise((resolve, reject) => {
    let img = new Image();

    img.onerror = () => {
      imgs.proxy.dead.push(id);
      console.error('img gg', id, imgs);
      img = null;
      reject(id);
    };

    img.onload = () => {
      console.log('load', id, imgs);
      imgs.proxy.good.push(id);
      img = null;
      resolve(id);
    };

    img.src = getProxyImgSrc(image);
  })

}

function getProxyImgSrc(imgPath, size = 96) {
  // // debug for #1 item
  // if (imgPath === 'useables/small_health_potion.png') {
  //   return imgPath;
  // }
  return `https://images.weserv.nl/?w=${size}&il&url=${getOrnaThumbImgSrc(imgPath)}`;
}

function getOriginImgSrc(imgPath) {
  return `https://orna.guide/static/orna/img/${imgPath}`;
}

function getOrnaThumbImgSrc(imgPath) {
  return `https://playorna.com/static/img/${imgPath}`;
}
