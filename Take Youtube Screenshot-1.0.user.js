// ==UserScript==
// @name         Take Youtube Screenshot
// @namespace    https://github.com/MMDLOID/TakeYTBScreenshot
// @version      1.0
// @description  Take full HD screenshots of YouTube videos.
// @author       MMDLOID
// @match        *://www.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';

    //create button
    function createScreenshotButton() {
        // Check if the button already exists
        if (document.getElementById('screenshotButton')) return;

        //player control
        const controls = document.querySelector('.ytp-right-controls');
        if (!controls) return;

        //button elements
        const button = document.createElement('button');
        button.id = 'screenshotButton';
        button.textContent = 'Screenshot';
        button.style.cssText = 'padding: 6px; margin-left: 5px; background-color: #FF0000; color: #FFFFFF; font-weight: bold; cursor: pointer; border: none; position: relative; top: -20px;';

        //click = take screenshot
        button.addEventListener('click', () => {
            const video = document.querySelector('video');
            if (video) {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                //convert to imagePNG
                canvas.toBlob(blob => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'screenshot.png';
                    link.click();
                });
            }
        });

        //append button
        controls.appendChild(button);
    }

    //load when youtuber player is loaded
    const observer = new MutationObserver(() => {
        if (document.querySelector('.ytp-right-controls')) {
            createScreenshotButton();
            observer.disconnect(); //stop checking once created
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
