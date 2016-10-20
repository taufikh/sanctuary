# S5S Sanctuary

Sanctuary is a tool that makes it easy for Disaster Recovery Coordinator authorities, emergency responders, and large civilian populations in distress to respond effectively, collectively, and compassionately to natural disasters in megacities.

With Sanctuary, a civilian seeking safety:

* is **directed** towards safe zones and peer resources,
* can **find and gather with** fellow civilians,
* to **pool and share resources** during and after crisis scenarios.

Similarly, emergency responders and Disaster Recovery Coordinator authorities using Sanctuary:

* gets **real-time info** about groups of civilian's needs,
* can **find** fellow responders and civilians in the field,
* and **coordinate large group's movements**.

Sanctuary won the [MD5 & NYU F16 Hackathon's "Challenges in Disaster Relief in Megacities" accelorator](https://md5.net/hackathonf16) in October, 2016.

## How Sanctuary works

Sanctuary provides a common operating picture of disaster terrain to emergency responders *and* civilians. It leverages the ubiquity of smartphones among civilian populations in megacities and builds on state-of-the-art Web APIs in the pre-installed mobile web browsers to provide most of its user-facing functionality.

1. When a disaster strikes, the existing [Wireless Emergency Alert (WEA) system](https://www.fcc.gov/consumers/guides/wireless-emergency-alerts-wea) is engaged and transmits a shortened URL to a cloud-hosted Sanctuary instance.
1. Civilians tap or click the URL to immediately open the Sanctuary mobile web interface. There is no app to install, ensuring the lightest possible load on the network.
1. The Sanctuary (client) loads in the civilians' mobile web browser, detects their GPS coordinates, transmits these to the Sanctuary Coordinator (server), and downloads the GPS coordinates of the nearest "safe zone," which is displayed as a green arrow.
1. The civilian moves in the direction of the green arrow. Civilians see the locations of other nearby civilians on their map, and instictually cluster together, forming larger and larger groups, simultaneously enabling "good Samaritan" behavior.
1. At any time, a civilian can report their current needs, supplies, group size, and other pertinent information to the Sanctuary Coordinator with the tap of a button.

Sanctuary Coordinators see a bird's-eye view of the disaster area and can "paint" regions of the affected area in "green" or "red" to denote safe or dangerous zones, respectively, as shown below:

![Mockup of a Sanctuary Coordinator view. (Not yet implemented.)](https://i.imgur.com/ZlfuSur.jpg)

For details, browse our [project wiki](https://github.com/s5s-sanctuary/sanctuary/wiki).

## Developing Sanctuary

Quick start guide to running the prototype.

### Requirements

To develop Sanctuary, you need:

* [Node.js](https://nodejs.org/) (and `npm`)
* [Bower](https://bower.io/)
* A modern, feature-complete web browser (Mozilla Firefox, Google Chrome, or equivalent).

### Installing

```shell
git clone https://github.com/S5S-Sanctuary/sanctuary.git # Get the code.
cd sanctuary                                             # Change to source code directory.
npm install                                              # Install server dependencies.
# npm install -g bower                                   # If you don't already have Bower, install it.
bower install                                            # Install the front-end dependencies.
node index.js                                            # Run the server.
```

Then visit [http://localhost:3000/](http://localhost:3000/) in your web browser.

## Roadmap

Sanctuary has a clear roadmap and vision for future development:

* [ ] Resiliance to network failure:
  * Kopis Mobile VDBs/NNTVs with mesh-aware WebTorrent/WebRTC clients.
  * Civilians still access Common Operating Picture to provide mutual aid, further unburdening officials.
  * Emergency personnel are couriers between isolated VDB/NNTV-powered subnets.
* [ ] Visibility on emergent issues:
  * Crowd movement patterns can reveal previously unknown obstacles.
  * Dynamically respond to changes in evacuation routes and instantly steer both civilians and responders to where they need to be, using one tool, at scale.

For details, see our [issue tracker](https://github.com/s5s-sanctuary/sanctuary/issues).
