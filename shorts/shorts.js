/* =================================================
   ZIZZVERSE SHORTS JAVASCRIPT
================================================= */


/* =================================================
   MOBILE MENU
================================================= */

const menuButton = document.getElementById("menuBtn");
const navigationMenu = document.getElementById("navLinks");

if (menuButton && navigationMenu) {

    menuButton.addEventListener("click", () => {

        navigationMenu.classList.toggle("active");

        const isOpen =
            navigationMenu.classList.contains("active");

        if (isOpen) {

            menuButton.textContent = "✕";

            menuButton.setAttribute(
                "aria-label",
                "Close menu"
            );

        } else {

            menuButton.textContent = "☰";

            menuButton.setAttribute(
                "aria-label",
                "Open menu"
            );

        }

    });


    /* Close menu after clicking a link */

    navigationMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navigationMenu.classList.remove("active");

                menuButton.textContent = "☰";

                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            });

        });

}


/* =================================================
   ALL VIDEOS
================================================= */

const videos = document.querySelectorAll(
    ".short-card video"
);


/* =================================================
   PAUSE ALL OTHER VIDEOS
================================================= */

function pauseOtherVideos(currentVideo) {

    videos.forEach(video => {

        if (video !== currentVideo) {
            video.pause();
        }

    });

}


/* =================================================
   PLAY VIDEO SAFELY
================================================= */

function playVideo(video) {

    pauseOtherVideos(video);

    const playPromise = video.play();

    if (playPromise !== undefined) {

        playPromise.catch(() => {
            /* Browser prevented playback */
        });

    }

}


/* =================================================
   AUTO PLAY / PAUSE
================================================= */

if ("IntersectionObserver" in window) {

    const videoObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    const video = entry.target;

                    if (
                        entry.isIntersecting &&
                        entry.intersectionRatio >= 0.7
                    ) {

                        playVideo(video);

                    } else {

                        video.pause();

                    }

                });

            },
            {
                threshold: [0.7]
            }
        );


    videos.forEach(video => {

        videoObserver.observe(video);

    });

}


/* =================================================
   CREATE CUSTOM CONTROLS
================================================= */

document
    .querySelectorAll(".video-box")
    .forEach(box => {

        const video = box.querySelector("video");

        if (!video) return;


        /* Make sure autoplay can work */

        video.muted = true;


        /* =================================================
           CONTROLS CONTAINER
        ================================================= */

        const controls =
            document.createElement("div");

        controls.className =
            "custom-controls";


        /* =================================================
           PLAY BUTTON
        ================================================= */

        const playBtn =
            document.createElement("button");

        playBtn.className =
            "custom-btn";

        playBtn.type =
            "button";

        playBtn.textContent =
            "▶";

        playBtn.setAttribute(
            "aria-label",
            "Play or pause"
        );


        /* =================================================
           BACK 10
        ================================================= */

        const backBtn =
            document.createElement("button");

        backBtn.className =
            "custom-btn";

        backBtn.type =
            "button";

        backBtn.textContent =
            "↶10";

        backBtn.setAttribute(
            "aria-label",
            "Back 10 seconds"
        );


        /* =================================================
           FORWARD 10
        ================================================= */

        const forwardBtn =
            document.createElement("button");

        forwardBtn.className =
            "custom-btn";

        forwardBtn.type =
            "button";

        forwardBtn.textContent =
            "10↷";

        forwardBtn.setAttribute(
            "aria-label",
            "Forward 10 seconds"
        );


        /* =================================================
           MUTE
        ================================================= */

        const muteBtn =
            document.createElement("button");

        muteBtn.className =
            "custom-btn";

        muteBtn.type =
            "button";

        muteBtn.textContent =
            "🔇";

        muteBtn.setAttribute(
            "aria-label",
            "Mute or unmute"
        );


        /* =================================================
           PROGRESS BAR
        ================================================= */

        const progress =
            document.createElement("input");

        progress.className =
            "custom-progress";

        progress.type =
            "range";

        progress.min =
            "0";

        progress.max =
            "100";

        progress.value =
            "0";

        progress.step =
            "0.1";

        progress.setAttribute(
            "aria-label",
            "Video progress"
        );


        /* =================================================
           FULLSCREEN
        ================================================= */

        const fullscreenBtn =
            document.createElement("button");

        fullscreenBtn.className =
            "custom-btn";

        fullscreenBtn.type =
            "button";

        fullscreenBtn.textContent =
            "⛶";

        fullscreenBtn.setAttribute(
            "aria-label",
            "Fullscreen"
        );


        /* =================================================
           ADD CONTROLS
        ================================================= */

        controls.appendChild(playBtn);

        controls.appendChild(backBtn);

        controls.appendChild(forwardBtn);

        controls.appendChild(muteBtn);

        controls.appendChild(progress);

        controls.appendChild(fullscreenBtn);

        box.appendChild(controls);


        /* =================================================
           VIDEO CLICK = PLAY / PAUSE
        ================================================= */

        video.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                if (video.paused) {

                    playVideo(video);

                } else {

                    video.pause();

                }

                showControls();

            }
        );


        /* =================================================
           PLAY BUTTON
        ================================================= */

        playBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                if (video.paused) {

                    playVideo(video);

                } else {

                    video.pause();

                }

                showControls();

            }
        );


        /* =================================================
           PLAY ICON UPDATE
        ================================================= */

        video.addEventListener(
            "play",
            () => {

                playBtn.textContent =
                    "⏸";

            }
        );


        video.addEventListener(
            "pause",
            () => {

                playBtn.textContent =
                    "▶";

            }
        );


        /* =================================================
           BACK 10 SECONDS
        ================================================= */

        backBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                video.currentTime =
                    Math.max(
                        0,
                        video.currentTime - 10
                    );

                showControls();

            }
        );


        /* =================================================
           FORWARD 10 SECONDS
        ================================================= */

        forwardBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                if (
                    Number.isFinite(video.duration)
                ) {

                    video.currentTime =
                        Math.min(
                            video.duration,
                            video.currentTime + 10
                        );

                }

                showControls();

            }
        );


        /* =================================================
           MUTE / UNMUTE
        ================================================= */

        muteBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                video.muted =
                    !video.muted;


                if (video.muted) {

                    muteBtn.textContent =
                        "🔇";

                } else {

                    muteBtn.textContent =
                        "🔊";

                }

                showControls();

            }
        );


        /* =================================================
           UPDATE PROGRESS
        ================================================= */

        video.addEventListener(
            "timeupdate",
            () => {

                if (
                    Number.isFinite(video.duration) &&
                    video.duration > 0
                ) {

                    progress.value =
                        (
                            video.currentTime /
                            video.duration
                        ) * 100;

                }

            }
        );


        /* =================================================
           VIDEO LOADED
        ================================================= */

        video.addEventListener(
            "loadedmetadata",
            () => {

                progress.value = "0";

            }
        );


        /* =================================================
           SEEK
        ================================================= */

        progress.addEventListener(
            "input",
            event => {

                event.stopPropagation();

                if (
                    Number.isFinite(video.duration) &&
                    video.duration > 0
                ) {

                    video.currentTime =
                        (
                            Number(progress.value) /
                            100
                        ) * video.duration;

                }

                showControls();

            }
        );


        /* =================================================
           FULLSCREEN
        ================================================= */

        fullscreenBtn.addEventListener(
            "click",
            async event => {

                event.stopPropagation();

                try {

                    if (
                        document.fullscreenElement
                    ) {

                        await document.exitFullscreen();

                    } else if (
                        box.requestFullscreen
                    ) {

                        await box.requestFullscreen();

                    }

                } catch (error) {

                    /* Fullscreen not available */

                }

                showControls();

            }
        );


        /* =================================================
           DOUBLE CLICK = FULLSCREEN
        ================================================= */

        video.addEventListener(
            "dblclick",
            async event => {

                event.stopPropagation();

                try {

                    if (
                        document.fullscreenElement
                    ) {

                        await document.exitFullscreen();

                    } else if (
                        box.requestFullscreen
                    ) {

                        await box.requestFullscreen();

                    }

                } catch (error) {

                    /* Fullscreen not available */

                }

            }
        );


        /* =================================================
           SHOW / HIDE CONTROLS
        ================================================= */

        let hideTimer;


        function showControls() {

            box.classList.add(
                "controls-visible"
            );

            clearTimeout(hideTimer);


            hideTimer =
                setTimeout(
                    () => {

                        if (!video.paused) {

                            box.classList.remove(
                                "controls-visible"
                            );

                        }

                    },
                    2500
                );

        }


        /* Desktop */

        box.addEventListener(
            "mouseenter",
            showControls
        );


        box.addEventListener(
            "mousemove",
            showControls
        );


        /* Mobile */

        box.addEventListener(
            "touchstart",
            showControls,
            {
                passive: true
            }
        );


        /* Keep controls visible when paused */

        video.addEventListener(
            "pause",
            () => {

                box.classList.add(
                    "controls-visible"
                );

            }
        );

    });


/* =================================================
   SEARCH
================================================= */

const searchInput =
    document.getElementById(
        "shortSearch"
    );

const shortCards =
    document.querySelectorAll(
        ".short-card"
    );

const noResults =
    document.getElementById(
        "noResults"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            const searchText =
                searchInput.value
                    .toLowerCase()
                    .trim();


            let found = false;


            shortCards.forEach(card => {

                const title =
                    card
                        .querySelector("h3")
                        ?.textContent
                        .toLowerCase() || "";


                const description =
                    card
                        .querySelector("p")
                        ?.textContent
                        .toLowerCase() || "";


                const dataTitle =
                    (
                        card.getAttribute(
                            "data-title"
                        ) || ""
                    ).toLowerCase();


                const matches =
                    title.includes(searchText) ||
                    description.includes(searchText) ||
                    dataTitle.includes(searchText);


                if (matches) {

                    card.style.display = "";

                    found = true;

                } else {

                    card.style.display = "none";

                    const video =
                        card.querySelector("video");

                    if (video) {
                        video.pause();
                    }

                }

            });


            if (noResults) {

                if (
                    found ||
                    searchText === ""
                ) {

                    noResults.style.display =
                        "none";

                } else {

                    noResults.style.display =
                        "block";

                }

            }

        }
    );

}


/* =================================================
   KEYBOARD SHORTCUTS
================================================= */

document.addEventListener(
    "keydown",
    event => {

        const activeElement =
            document.activeElement;


        /* Don't control video while typing */

        if (
            activeElement &&
            (
                activeElement.tagName === "INPUT" ||
                activeElement.tagName === "TEXTAREA"
            )
        ) {
            return;
        }


        /* Find visible/active video */

        let activeVideo = null;


        videos.forEach(video => {

            if (
                !video.paused &&
                !video.ended
            ) {

                activeVideo = video;

            }

        });


        if (!activeVideo) return;


        /* Space = Play / Pause */

        if (event.code === "Space") {

            event.preventDefault();

            if (activeVideo.paused) {

                playVideo(activeVideo);

            } else {

                activeVideo.pause();

            }

        }


        /* Arrow Left = Back */

        if (event.code === "ArrowLeft") {

            activeVideo.currentTime =
                Math.max(
                    0,
                    activeVideo.currentTime - 5
                );

        }


        /* Arrow Right = Forward */

        if (event.code === "ArrowRight") {

            if (
                Number.isFinite(
                    activeVideo.duration
                )
            ) {

                activeVideo.currentTime =
                    Math.min(
                        activeVideo.duration,
                        activeVideo.currentTime + 5
                    );

            }

        }

    }
);


/* =================================================
   END
================================================= */
