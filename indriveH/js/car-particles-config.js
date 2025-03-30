const carParticlesConfig = {
  particles: {
    number: {
      value: 10,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#ffaa80"
    },
    shape: {
      type: "image",
      image: {
        src: "../images/car-particle.png",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.3,
      random: true
    },
    size: {
      value: 15,
      random: true,
      anim: {
        enable: true,
        speed: 2
      }
    },
    move: {
      enable: true,
      speed: 2,
      direction: "right",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4
      }
    }
  },
  retina_detect: true
};
