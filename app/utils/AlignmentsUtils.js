export function alignNprogress(argument) {
  let top = 55 - $(document).scrollTop();
  if(__DEBUG__) console.log('top',top)
  $('#nprogress .bar').css('top',top < 0 ? 0 : top);
}