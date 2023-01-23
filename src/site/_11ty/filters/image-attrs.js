module.exports = (value) => {
  if (value === "") return;
  let url;
  try {
    url = new URL(value);
  } catch (error) {
    console.log(value, error);
    return;
  }

  if (url.hostname !== "lh3.googleusercontent.com") return null;

  const { origin, pathname, search, hash } = url;
  const params = new URLSearchParams(hash.slice(1));

  const width = parseInt(params.get("width"), 10);
  const height = parseInt(params.get("height"), 10);
  const className = params.get("className");
  return {
    id: `${origin}${pathname}${search}`,
    url: `${origin}${pathname}${search}=w${width}-h${height}-rw`,
    src: `${origin}${pathname}${search}`,
    width,
    height,
    className,
  };
};
