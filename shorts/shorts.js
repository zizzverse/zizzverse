/* =================================================
   ZIZZVERSE REELS JAVASCRIPT
================================================= */

const reels = document.querySelectorAll(".reel");
const videos = document.querySelectorAll(".reel-video");



/* =================================================
   PAUSE ALL OTHER VIDEOS
================================================= */

function pauseOthers(current) {

    videos.forEach(video => {

        if (video !== current) {
            video.pause();
        }

    });

}



/* =================================================
   SET REEL STATE
================================================= */

function updateReelState(reel, video) {

    if (video.paused) {

        reel.classList.add("paused");

    } else {

        reel.classList.remove("paused");

    }

}



/* =================================================
   CREATE CONTROLS
================================================= */

reels.forEach(reel => {

    const video =
        reel.querySelector(".reel-video");

    const centerPlay =
        reel.querySelector(".center-play");

    const playControl =
        reel.querySelector(".play-control");

    const muteControl =
        reel.querySelector(".mute-control");

    const fullscreenControl =
        reel.querySelector(".fullscreen-control");

    const progress =
        reel.querySelector(".reel-progress");

    const likeButton =
        reel.querySelector(".like-btn");

    const shareButton =
        reel.querySelector(".share-btn");



    /* =================================================
       INITIAL STATE
    ================================================= */

    video.muted = false;

    updateReelState(reel, video);



    /* =================================================
       PLAY
    ================================================= */

    function play() {

        pauseOthers(video);

        video.play().catch(() => {});

    }



    /* =================================================
       VIDEO CLICK
    ================================================= */

    video.addEventListener("click", () => {

        if (video.paused) {

            video.muted = false;

            muteControl.textContent = "🔊";

            play();

        } else {

            video.pause();

        }

    });



    /* =================================================
       CENTER PLAY
    ================================================= */

    centerPlay.addEventListener("click", event => {

        event.stopPropagation();

        if (video.paused) {

            video.muted = false;

            muteControl.textContent = "🔊";

            play();

        } else {

            video.pause();

        }

    });



    /* =================================================
       PLAY CONTROL
    ================================================= */

    playControl.addEventListener("click", event => {

        event.stopPropagation();

        if (video.paused) {

            video.muted = false;

            muteControl.textContent = "🔊";

            play();

        } else {

            video.pause();

        }

    });



    /* =================================================
       PLAY EVENT
    ================================================= */

    video.addEventListener("play", () => {

        playControl.textContent = "⏸";

        updateReelState(reel, video);

    });



    /* =================================================
       PAUSE EVENT
    ================================================= */

    video.addEventListener("pause", () => {

        playControl.textContent = "▶";

        updateReelState(reel, video);

    });



    /* =================================================
       MUTE
    ================================================= */

    muteControl.addEventListener("click", event => {

        event.stopPropagation();

        video.muted = !video.muted;

        muteControl.textContent =
            video.muted ? "🔇" : "🔊";

    });



    /* =================================================
       PROGRESS
    ================================================= */

    video.addEventListener("timeupdate", () => {

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

    });



    progress.addEventListener("input", event => {

        event.stopPropagation();

        if (
            Number.isFinite(video.duration) &&
            video.duration > 0
        ) {

            video.currentTime =
                (
                    progress.value / 100
                ) * video.duration;

        }

    });



    /* =================================================
       FULLSCREEN
    ================================================= */

    fullscreenControl.addEventListener(
        "click",
        async event => {

            event.stopPropagation();

            try {

                if (document.fullscreenElement) {

                    await document.exitFullscreen();

                } else if (video.requestFullscreen) {

                    await video.requestFullscreen();

                } else if (
                    video.webkitEnterFullscreen
                ) {

                    video.webkitEnterFullscreen();

                }

            } catch (error) {

                console.log(
                    "Fullscreen error:",
                    error
                );

            }

        }
    );



    /* =================================================
       DOUBLE CLICK FULLSCREEN
    ================================================= */

    video.addEventListener(
        "dblclick",
        async event => {

            event.stopPropagation();

            try {

                if (document.fullscreenElement) {

                    await document.exitFullscreen();

                } else if (video.requestFullscreen) {

                    await video.requestFullscreen();

                }

            } catch (error) {

                console.log(
                    "Fullscreen error:",
                    error
                );

            }

        }
    );



    /* =================================================
       LIKE
    ================================================= */

    likeButton.addEventListener("click", event => {

        event.stopPropagation();

        likeButton.classList.toggle("liked");

        if (
            likeButton.classList.contains("liked")
        ) {

            likeButton.firstChild.textContent = "♥";

        } else {

            likeButton.firstChild.textContent = "♡";

        }

    });



    /* =================================================
       SHARE
    ================================================= */

    shareButton.addEventListener("click", async event => {

        event.stopPropagation();

        const url =
            window.location.href;

        if (navigator.share) {

            try {

                await navigator.share({
                    title: "ZIZZVERSE Shorts",
                    text: "Watch this anime short on ZIZZVERSE!",
                    url: url
                });

            } catch (error) {

                /* User cancelled share */

            }

        } else {

            try {

                await navigator.clipboard.writeText(url);

                alert("Link copied!");

            } catch (error) {

                alert("Copy the page link to share.");

            }

        }

    });

});



/* =================================================
   AUTO PLAY WHEN REEL IS VISIBLE
================================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                const reel =
                    entry.target;

                const video =
                    reel.querySelector(".reel-video");


                if (
                    entry.isIntersecting &&
                    entry.intersectionRatio >= 0.75
                ) {

                    /*
                       Browser may block autoplay with sound.
                       If it does, user can tap the video.
                    */

                    video.play().catch(() => {});

                } else {

                    video.pause();

                }

            });

        },
        {
            threshold: [0.75]
        }
    );


reels.forEach(reel => {

    observer.observe(reel);

});



/* =================================================
   SEARCH
================================================= */

const searchBtn =
    document.getElementById("searchBtn");

const searchPanel =
    document.getElementById("searchPanel");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("shortSearch");

const noResults =
    document.getElementById("noResults");


searchBtn.addEventListener("click", () => {

    searchPanel.classList.toggle("active");

    if (
        searchPanel.classList.contains("active")
    ) {

        searchInput.focus();

    }

});


closeSearch.addEventListener("click", () => {

    searchPanel.classList.remove("active");

    searchInput.value = "";

    reels.forEach(reel => {

        reel.style.display = "";

    });

});



searchInput.addEventListener("input", () => {

    const text =
        searchInput.value
            .toLowerCase()
            .trim();

    let found = false;


    reels.forEach(reel => {

        const title =
            (
                reel.dataset.title || ""
            ).toLowerCase();

        const info =
            reel.textContent.toLowerCase();


        const match =
            title.includes(text) ||
            info.includes(text);


        if (match) {

            reel.style.display = "";

            found = true;

        } else {

            reel.style.display = "none";

            const video =
                reel.querySelector(".reel-video");

            if (video) {
                video.pause();
            }

        }

    });


    if (text && !found) {

        noResults.style.display = "flex";

    } else {

        noResults.style.display = "none";

    }

});



/* =================================================
   KEYBOARD
================================================= */

document.addEventListener("keydown", event => {

    if (
        document.activeElement &&
        document.activeElement.tagName === "INPUT"
    ) {
        return;
    }


    let activeVideo = null;


    videos.forEach(video => {

        const rect =
            video.getBoundingClientRect();

        const visible =
            rect.top < window.innerHeight &&
            rect.bottom > 0;

        if (
            visible &&
            !video.paused
        ) {

            activeVideo = video;

        }

    });


    if (!activeVideo) return;


    /* SPACE */

    if (event.code === "Space") {

        event.preventDefault();

        if (activeVideo.paused) {

            activeVideo.play().catch(() => {});

        } else {

            activeVideo.pause();

        }

    }


    /* LEFT */

    if (event.code === "ArrowLeft") {

        activeVideo.currentTime =
            Math.max(
                0,
                activeVideo.currentTime - 5
            );

    }


    /* RIGHT */

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

});

/* =================================================
   MENU BUTTON
================================================= */

const menuBtn =
    document.getElementById("menuBtn");


if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        /*
           Create menu if it does not already exist
        */

        let menu =
            document.getElementById("mobileMenu");


        if (!menu) {

            menu =
                document.createElement("div");

            menu.id = "mobileMenu";

            menu.className = "mobile-menu";


            menu.innerHTML = `
                <a href="../">Home</a>
                <a href="../#trending">Trending</a>
                <a href="../#popular">Popular</a>
                <a href="../#genres">Genres</a>
                <a href="index.html">Shorts</a>
            `;


            document.body.appendChild(menu);

        }


        menu.classList.toggle("active");


        if (
            menu.classList.contains("active")
        ) {

            menuBtn.textContent = "✕";

        } else {

            menuBtn.textContent = "☰";

        }

    });

}
