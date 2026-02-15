function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true,
        tablet: { smooth: true },
        smartphone: { smooth: true }
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

init();

var crsr = document.querySelector(".cursor");
var main = document.querySelector(".main");

// Only enable custom cursor on non-touch devices
if (!window.matchMedia("(hover: none)").matches) {
    document.addEventListener("mousemove", function (dets) {
        crsr.style.left = dets.x + 20 + "px";
        crsr.style.top = dets.y + 20 + "px";
    });

    var boxes = document.querySelectorAll(".box");
    boxes.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            var att = elem.getAttribute("data-image");
            crsr.style.width = "470px";
            crsr.style.height = "370px";
            crsr.style.borderRadius = "0";
            crsr.style.backgroundImage = `url(${att})`;
        });
        elem.addEventListener("mouseleave", function () {
            elem.style.backgroundColor = "transparent";
            crsr.style.width = "20px";
            crsr.style.height = "20px";
            crsr.style.borderRadius = "50%";
            crsr.style.backgroundImage = `none`;
        });
    });
}

// GSAP Animations with matchMedia
ScrollTrigger.matchMedia({
    // Desktop and Tablet (Large screens)
    "(min-width: 800px)": function () {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".page1 h1",
                scroller: ".main",
                start: "top 27%",
                end: "top 0",
                scrub: 3
            }
        });
        tl.to(".page1 h1", { x: -100 }, "anim");
        tl.to(".page1 h2", { x: 100 }, "anim");
        tl.to(".page1 video", { width: "90%" }, "anim");

        var tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".page1 h1",
                scroller: ".main",
                start: "top -115%",
                end: "top -120%",
                scrub: 3
            }
        });
        tl2.to(".main", { backgroundColor: "#fff" });

        var tl3 = gsap.timeline({
            scrollTrigger: {
                trigger: ".page1 h1",
                scroller: ".main",
                start: "top -280%",
                end: "top -300%",
                scrub: 3
            }
        });
        tl3.to(".main", { backgroundColor: "#0F0D0D" });
    },

    // Mobile (Small screens)
    "(max-width: 799px)": function () {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".page1 h1",
                scroller: ".main",
                start: "top 27%",
                end: "top 0",
                scrub: 3
            }
        });
        // Reduced movement for mobile to prevent overflow/jaggedness
        tl.to(".page1 h1", { x: -30 }, "anim");
        tl.to(".page1 h2", { x: 30 }, "anim");
        tl.to(".page1 video", { width: "90%" }, "anim"); // Keep video expansion

        // Adjust background color trigger points if needed, currently keeping same relative logic
        var tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".page1 h1",
                scroller: ".main",
                start: "top -115%",
                end: "top -120%",
                scrub: 3
            }
        });
        tl2.to(".main", { backgroundColor: "#fff" });

        var tl3 = gsap.timeline({
            scrollTrigger: {
                trigger: ".page1 h1",
                scroller: ".main",
                start: "top -280%",
                end: "top -300%",
                scrub: 3
            }
        });
        tl3.to(".main", { backgroundColor: "#0F0D0D" });
    },

    // All sizes
    "all": function () {
        gsap.from(".page1 h1,.page1 h2", {
            y: 10,
            rotate: 10,
            opacity: 0,
            delay: 0.3,
            duration: 0.7
        });

        var h4 = document.querySelectorAll("#nav h4")
        var purple = document.querySelector("#purple")
        var marqueeH1s = document.querySelectorAll(".marquee h1");

        h4.forEach(function (elem) {
            elem.addEventListener("mouseenter", function () {
                // Get the text content of the hovered link
                let text = elem.textContent;
                // Repeat it to fill the marquee
                let marqueeText = (text + " ").repeat(20);

                // Update all marquee h1s
                marqueeH1s.forEach(h1 => h1.textContent = marqueeText);

                purple.style.display = "block"
                purple.style.opacity = "1"
            })
            elem.addEventListener("mouseleave", function () {
                purple.style.display = "none"
                purple.style.opacity = "0"
            })
        })

        var footerTl = gsap.timeline({
            scrollTrigger: {
                trigger: "footer",
                scroller: ".main",
                start: "top 50%",
                end: "top 0",
                scrub: 2
            }
        });

        footerTl.from("#footer-top", {
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2
        });

        footerTl.from("#footer-div h1", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        });

        footerTl.from("#footer-bottom", {
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2
        });
    }
});

// Navigation Underline Logic
function navHighlight() {
    var navLinks = document.querySelectorAll("#nav h4");
    var currentSectionIndex = 0; // Default to Home

    function setActiveLog(index) {
        navLinks.forEach((link, i) => {
            if (i === index) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Initialize Home as active
    setActiveLog(0);

    // Track scroll position to update currentSectionIndex

    // Page 1 & 2 -> Home (Index 0)
    ScrollTrigger.create({
        trigger: ".page1",
        scroller: ".main",
        start: "top center",
        end: "bottom center",
        onEnter: () => { currentSectionIndex = 0; setActiveLog(0); },
        onEnterBack: () => { currentSectionIndex = 0; setActiveLog(0); }
    });

    ScrollTrigger.create({
        trigger: ".page2",
        scroller: ".main",
        start: "top center",
        end: "bottom center",
        onEnter: () => { currentSectionIndex = 0; setActiveLog(0); },
        onEnterBack: () => { currentSectionIndex = 0; setActiveLog(0); }
    });

    // Page 3 -> Work (Index 1)
    ScrollTrigger.create({
        trigger: ".page3",
        scroller: ".main",
        start: "top center",
        end: "bottom center",
        onEnter: () => { currentSectionIndex = 1; setActiveLog(1); },
        onEnterBack: () => { currentSectionIndex = 1; setActiveLog(1); }
    });

    // Page 4 & 5 -> Studio (Index 2)
    ScrollTrigger.create({
        trigger: ".page4",
        scroller: ".main",
        start: "top center",
        end: "bottom center",
        onEnter: () => { currentSectionIndex = 2; setActiveLog(2); },
        onEnterBack: () => { currentSectionIndex = 2; setActiveLog(2); }
    });

    ScrollTrigger.create({
        trigger: ".page5",
        scroller: ".main",
        start: "top center",
        end: "bottom center",
        onEnter: () => { currentSectionIndex = 2; setActiveLog(2); },
        onEnterBack: () => { currentSectionIndex = 2; setActiveLog(2); }
    });

    // Footer -> Contact (Index 3)
    ScrollTrigger.create({
        trigger: "footer",
        scroller: ".main",
        start: "top 80%",
        end: "bottom bottom",
        onEnter: () => { currentSectionIndex = 3; setActiveLog(3); },
        onEnterBack: () => { currentSectionIndex = 3; setActiveLog(3); }
    });


    // Hover Logic
    navLinks.forEach((link, index) => {
        link.addEventListener("mouseenter", () => {
            setActiveLog(index);
        });

        link.addEventListener("mouseleave", () => {
            setActiveLog(currentSectionIndex);
        });
    });
}

navHighlight();
