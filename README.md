Piskel Sharp: Beta
===================

Piskel is an easy-to-use sprite editor and can be used to create game sprites, animations, pixel-art, etc.
It's the editor hosted on **[piskelapp.com](https://www.piskelapp.com)** and was created with Typescript and Javascript,
along with the HTML and CSS content and styling. Piskel has been used in many ways such as the sprite editor
of **[code.org](https://www.code.org)** and **[GDevelop's](https://gdevelop.io)** default sprite editor. It is also available on the **[Multi-Bit-Catalogue](https://that-one-bit.github.io/Multi-Bit-Catalogue/)**.

## How to Use Piskel Sharp
----

Piskel Sharp is available on the releases page ([latest](/releases/latest), for Windows, OSX (macOS) Intel and Arm, Linux, and PreWeb).
These builds are the most complete version of Piskel Sharp in many ways, but there are more ways to use Piskel Sharp.
The latest stable developement version of Piskel Sharp will almost always be up on the **[Multi-Bit-Catalogue](https://that-one-bit.github.io/Multi-Bit-Catalogue/)**, which will state it's current version. To minimize the chance of crashing, try sticking to the desktop version of Piskel Sharp.* 
Piskel Sharp will always be free, with no ads, and most likely no GoFundMe or Patreon.

*While I may have broken developement builds up on the MBC, they shouldn't prohibit the use of the tool in it's entirety, as every build is tested but probably not thoroughly enough.

----
## What is Piskel Sharp?
----

Piskel Sharp is a fork of Piskel For Playdate, the first mod of Piskel that was made for the community by the community.
Based off of PFP, it has the same features listed **[here](https://blog.gingerbeardman.com/2023/05/10/piskel-for-playdate/)**, along with many others.

To start, it has more canvas backgrounds to support an even darker dark mode, along with a pre-installed dark mode theme. *Theme support is planned, but so far the current theme is the only one available. Themes are not the main focus of Piskel Sharp at this moment, but should be supported by the full release.

At the moment, the main focus is adding language support for Piskel Sharp, along with a way to switch it with the in-built GUI instead of the devtools console. As of 8/9/26, a major advancement in this has been achieved. We have found a way to reload all titles and strings without relying on a built-in function, allowing for languages to reload for items more than just the toolset. This will be the key for implementing live locale switches into Piskel Sharp.

Another misc. thing added was filled shapes for both the rectangle and circle tools. Made by holding ctrl, creating filled shapes has never been easier (I know its corny)! The final feature that... doesn't really work yet is the changelog tab! The dialogs have not been added yet, but in the near future there will be a changelog dialog for both Piskel and Piskel Sharp, as both are being updated to this day. There is also a future plans and credits button too.

Piskel Sharp is a community extension of Piskel that attempts to make the editor more accessible to every style of user, while also making sure it stays updated with the main branch (oh I can't wait for the massive typescript update. I really can't). It is maintained myself, with small contributions from others. I reccommend you check out another cool Piskel fork known as **[RetroPiskel](https://RetroPiskel.com)** if you are interested in retro systems and other cool things the community/people willing to spend time on Piskel have done!

I plan to have this fork updated with the base version of Piskel, and keep it sustained until it just gets too hard. By that point, this tool will be pretty cool I bet. ``` I barely have an idea of what I'm doing, but atleast I'm doing it in a very unproffesional way. ``` - Is what I said before, but now that I have a much broader understanding of this tool, I truly believe that I can make something special.

----

## Building From Source
----

Install [Volta](https://volta.sh/) to install the projects required node version.
Open CMD and run ` npm install -g grunt-cli casperjs `
And finally run ` npm install ` to finish the building dependencies.

To build for a platform, select one of the following and run the the script below. At this moment, building for Linux has not been implemented into the package's local scripts.

Windows
\- `npm run build:win`

macOS (Intel)
\- `npm run build:mac`

macOS (ARM)
\- `npm run build:mac-arm`

Linux
\- `npm run build:linux`

Web (PrePackaged)
\- `npm run build:web`

Web (Development Server)
\- `npm run devhost`

----
### Built Upon
----

The Piskel editor is purely built in **JavaScript, HTML and CSS**.

We also use the following **libraries** :
* [spectrum](https://github.com/bgrins/spectrum) : Awesome standalone colorpicker
* [gifjs](https://jnordberg.github.io/gif.js/) : Generate animated GIFs in javascript, using webworkers
* [supergif](https://github.com/buzzfeed/libgif-js) : Modified version of SuperGif to parse and import GIFs
* [jszip](https://github.com/Stuk/jszip) : Used to create, read, and edit .zip files with Javascript
* [canvas-toBlob](https://github.com/eligrey/canvas-toBlob.js/) : Shim for canvas toBlob
* [jquery](https://jquery.com/) : Used sporadically in the application
* [bootstrap-tooltip](https://getbootstrap.com/javascript/#tooltips) : Stylized tooltips

As well as some **icons** from the [Noun Project](https://thenounproject.com/) :
* Folder by Simple Icons from The Noun Project
* (and probably one or two others)

### Browser Support

Piskel supports the following browsers:
* **Chrome** (latest)
* **Edge** (latest)
* **Firefox** (latest)
* **Opera** (latest)
* **Safari** (latest)
* **Internet Explorer** 11

### Mobile/Tablets

There is no support for mobile yet, but is planned.

----
## Contributing

Help is always welcome! Especially with this project.

* **Issues** : Found a problem when using the application, want to request a feature, or just let me know how you are?\* Make an issue [here](https://github.com/that-one-bit/piskel-sharp/issues).
* **Development** : Have a look at the official [Piskel Wiki](https://github.com/piskelapp/piskel/wiki) to set up the development environment or look at the building from source section above. Honestly, there aren't many rules to formatting for Piskel Sharp, but try to keep it neat and optimized.

\*Don't do this, it's a joke and it may count as spam

----

## License

Copyright 2026 That-One-Bit
Copyright 2023 Matt Sephton
Copyright 2017 Julian Descottes

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

<sub>The Readme was last updated for version b0.2.1 on 8/9/2026</sub>

