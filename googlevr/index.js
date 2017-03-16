
function onLoad() {
  vrView = new VRView.Player('#vrview', {
    width: '100%',
    //height: 480,
    image: 'taj-mahal.jpg',
    is_stereo: false,
    is_autopan_off: true
  });
}

window.addEventListener('load', onLoad);
