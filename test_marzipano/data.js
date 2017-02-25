var APP_DATA = {
  "scenes": [
    {
      "id": "0-mirador-del-prado",
      "name": "Mirador del Prado",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 1000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 2.0611418064731435,
          "pitch": 0.04092955899131567,
          "rotation": 0,
          "target": "1-mirador-la-dormida"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-mirador-la-dormida",
      "name": "Mirador la Dormida",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 1000,
      "initialViewParameters": {
        "yaw": 0.5508471444861147,
        "pitch": -0.043916100164480554,
        "fov": 1.7118260519418145
      },
      "linkHotspots": [
        {
          "yaw": 1.2016557871168931,
          "pitch": -0.07684936989318203,
          "rotation": 0,
          "target": "0-mirador-del-prado"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
};

