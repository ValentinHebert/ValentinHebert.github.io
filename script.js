const swup = new Swup({
    animateHistoryBrowsing: true
});

var vhtrpColor = {"photographie" : "#f0f0f0", "video" : "#0f0f0f", "contact" : "#333333"};

function init() {
    var navPos = document.querySelector("#nav-pos");
    if (navPos.hasChildNodes() == false) {
        navPos.innerHTML = `
            <div>
                <div id="nav-txt">
                    <div id="wn-v" class="nav-name">VALENTIN</div>
                    <div id="wn-h" class="nav-name">HÉBERT</div>
                    <div class="nav-separator"></div>
                </div>
                <nav>
                    <a id="photographie" class="navlink" href="/photographie/">
                        <div>
                            <div class="nav-sel"></div>
                            <span>PHOTOGRAPHIE</span>
                        </div>
                    </a>
                    <a id="video" class="navlink" href="/video/">
                        <div>
                            <div class="nav-sel"></div>
                            <span>VIDÉO</span>
                        </div>
                    </a>
                    <a id="contact" class="navlink" href="/contact/">
                        <div>
                            <div class="nav-sel"></div>
                            <span>CONTACT</span>
                        </div>
                    </a>
                </nav>
                <div id="nav-social">
                    <a id="ws-ig" href="/">
                        <svg viewBox="0 0 512 512">
                            <path d="M256,49.5c67.3,0,75.2,0.3,101.8,1.5c35.6,2.1,56.5,8.6,75.7,27.5c8.4,8.1,14.8,18,18.8,29c3.5,8.9,7.6,22.2,8.7,46.8c2,20.9,2,182.7,0,203.6c-2.9,67.7-35.6,100.4-103.3,103.3c-20.9,2-182.7,2-203.6,0c-35.7-2.1-56.5-8.6-75.7-27.5c-18.9-19.3-25.4-40.1-27.5-75.7c-1.2-26.6-1.5-34.5-1.5-101.8s0.3-75.2,1.5-101.8c2.1-35.6,8.6-56.5,27.5-75.7c19.3-18.9,40.1-25.4,75.7-27.5C180.8,49.7,188.7,49.5,256,49.5 M256,4.1c-94.8,2-156.9-8.9-209.6,42.3C-4.8,98.9,6.1,161.2,4.1,256c2,94.8-8.9,157,42.3,209.6C59,478.5,74.2,488.4,91,494.7c16,6.2,34.3,10.5,61.2,11.7c21.2,2.1,186.5,2.1,207.7,0c88.5-2,144.5-58,146.5-146.5c2.1-21.3,2.1-186.4,0-207.7c-2.7-45.8-12.1-76.1-40.8-105.8C413-4.8,350.9,6.1,256,4.1L256,4.1L256,4.1z"/>
                            <path d="M256,126.635A129.365,129.365,0,1,0,385.365,256,129.365,129.365,0,0,0,256,126.635Zm0,213.338A83.973,83.973,0,1,1,339.974,256,83.974,83.974,0,0,1,256,339.973Z"/>
                            <circle cx="390.476" cy="121.524" r="30.23"/>
                        </svg>
                    </a>
                </div>
            </div>
        `;

        document.querySelectorAll(".navlink").forEach(function (nl) {
            nl.mouseIsOver = false;
            nl.onmouseover = function() { this.mouseIsOver = true; };
            nl.onmouseout = function() { this.mouseIsOver = false; };

            nl.addEventListener("click", function(event) {
                var pageW = document.documentElement.clientWidth,
                    pageH = document.documentElement.clientHeight,
                    nlID = nl.id;

                document.querySelectorAll(".navlink:not(#" + nl.id + ")").forEach(function (nsel) { nsel.classList.remove("nl-current"); });
                document.querySelectorAll(".navlink:not(#" + nl.id + ") .nav-sel").forEach(function (nsel) { nsel.classList.remove("nlsel-current"); });
                nl.classList.add("nl-current");
                document.querySelector(".navlink#" + nl.id + " .nav-sel").classList.add("nlsel-current");

                if(nlID == "photographie") { document.documentElement.classList.add("photographie");
                } else { document.documentElement.classList.remove("photographie"); }

                // VHTRP
                var newVHTRC = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                    newVHTRCc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                newVHTRC.classList.add("vhtrp-circle"); newVHTRC.id = nlID;
                newVHTRC.setAttribute("viewBox", "0 0 " + (pageW / 100) + " " + (pageH / 100)); 
                newVHTRC.style.fill = vhtrpColor[nlID];
                newVHTRC.appendChild(newVHTRCc);
                document.querySelector("#vhtrp").appendChild(newVHTRC);


                var nltxt = document.querySelector(".navlink#" + nlID + " span"),
                    nlTLenW = pageW - (nltxt.getBoundingClientRect().left + (nltxt.offsetWidth / 2)),
                    nlTLenH = pageH - (pageH - (nltxt.getBoundingClientRect().top + (nltxt.offsetHeight / 2)));
                if(nlTLenH < (pageH / 2)) { console.log("mobile"); nlTLenH = pageH - (nltxt.getBoundingClientRect().top + (nltxt.offsetHeight / 2)); }
                nlCR = (Math.round(((nlTLenW)**2 + (nlTLenH)**2)**(1/2)) / 100);

                if(nl.mouseIsOver == true) {
                    var VHTRcPosX = (event.clientX / 100),
                        VHTRcPosY = (event.clientY / 100);
                } else { // for history browsing (not triggerable yet)
                    var VHTRcPosX = (Math.round(nltxt.getBoundingClientRect().left + (nltxt.offsetWidth / 2)) / 100),
                        VHTRcPosY = (Math.round(nltxt.getBoundingClientRect().top + (nltxt.offsetHeight / 2)) / 100);
                }

                newVHTRCc.setAttribute("cx", VHTRcPosX)
                newVHTRCc.setAttribute("cy", VHTRcPosY)
                setTimeout(function () {
                    newVHTRCc.style.transition = "r 900ms cubic-bezier(0.5, 0.7, 0, 1)";
                    newVHTRCc.setAttribute("r", nlCR)
                }, 10);
                setTimeout(function () {
                    document.body.style.backgroundColor = vhtrpColor[nlID];
                    document.querySelector("#container").style.backgroundColor = vhtrpColor[nlID];
                    newVHTRC.style.transition = "opacity 500ms ease";
                    newVHTRC.style.opacity = "0";
                    setTimeout(function () {
                        newVHTRC.remove();
                    }, 500);
                }, 900);
            });
        });
    }
}
init();
swup.on("contentReplaced", init);