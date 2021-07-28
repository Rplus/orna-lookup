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

  if (thumbnail) {
    return getProxyImgSrc(item.image, 16);
  }

  return (
    (item.deadProxyImage || true)
      ? getOriginImgSrc(item.image)
      : getProxyImgSrc(item.image)
  );
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
  return `https://images.weserv.nl/?w=${size}&il&url=${getOriginImgSrc (imgPath)}`;
}

function getOriginImgSrc(imgPath) {
  return `https://orna.guide/static/orna/img/${imgPath}`;
}
