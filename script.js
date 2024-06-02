// ==UserScript==
// @name         Class Availability Notifier for Multiple Sections
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Checks availability of class.
// @author       You
// @match        https://access.caltech.edu/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const targetClass = "CS 003";
    const targetSections = ["01", "02", "03", "07", "08"];
    let lastOpenSpots = {};

    function checkAvailability() {
        const classRows = document.querySelectorAll('tr');

        classRows.forEach(row => {
            const courseCode = row.querySelector('.t-Report-cell[headers="C003"]');
            const section = row.querySelector('.t-Report-cell[headers="C005"]');
            const openSpots = row.querySelector('.t-Report-cell[headers="C007"]');

            if (courseCode && section && openSpots && courseCode.textContent.trim() === targetClass && targetSections.includes(section.textContent.trim())) {
                const availableSpots = parseInt(openSpots.textContent.trim());
                const sectionText = section.textContent.trim();

                if (availableSpots > 0 && (lastOpenSpots[sectionText] === undefined || availableSpots !== lastOpenSpots[sectionText])) {
                    notifyUser(sectionText, availableSpots);
                    lastOpenSpots[sectionText] = availableSpots;
                }
                return;
            }
        });
    }

    function notifyUser(section, availableSpots) {
        const notification = `Open spots for ${targetClass} section ${section}: ${availableSpots}`;
        alert(notification);
    }

    function autoRefresh() {
        setInterval(() => {
            location.reload();
        }, 3000);
    }

    // Run the functions
    checkAvailability();
    autoRefresh();
})();
