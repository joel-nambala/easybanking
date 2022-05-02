'use strict';

////////////////////////////////////////////////
// Copyright year
const copyrightYear = document.querySelector('.copy__year');

const changeCopyrightYear = function () {
  const today = new Date();
  const currentYear = today.getFullYear();
  copyrightYear.textContent = currentYear;
};

changeCopyrightYear();

///////////////////////////////////////////
// Fixed navigation
const navigation = document.querySelector('.navigation');

/**
 * @author Joel Nambala
 * @description: if the scroll height > nav height, add the sticky class to the navigation bar, else remove the sticky class
 */
const fixedNavigation = function () {
  // 1. Calculate the heights
  const scrollHeight = window.scrollY;
  const navHeight = navigation.getBoundingClientRect().height;

  // 2. If scroll height > nav height, add the sticky class
  if (scrollHeight > navHeight) navigation.classList.add('sticky');
  else navigation.classList.remove('sticky');
};

// Add a scroll event to the window object
window.addEventListener('scroll', fixedNavigation);

///////////////////////////////////////////
// Responsive navigation
const navMenu = document.querySelector('.nav__menu');
const listContainer = document.querySelector('.list-container');
const navList = document.querySelector('.nav__list');

/**
 * @author Joel Nambala
 * @description Adds the list height value to the container height if the container height is '0' when a nav menu is clicked
 */
navMenu.addEventListener('click', function () {
  // 1. Calculate the heights
  const containerHeight = listContainer.getBoundingClientRect().height;
  const listHeight = navList.getBoundingClientRect().height;

  // 2. Change the heights dynamically
  if (containerHeight === 0) listContainer.style.height = `${listHeight}px`;
  else listContainer.style.height = 0;
});

//////////////////////////////////////////////
// Smooth scroll
const scrollLinks = document.querySelectorAll('.scroll__link');

/**
 * @author Joel Nambala
 * @description {
 *  1. Select all links to scroll. They should have the same class name
 *  2. Loop over all the links and add event listener to the links
 *  3. Pass the event arguement into the callback function thrn prevent the default behaviour
 *  4. Get the current ID of the link clicked by the following code (id = e.currentTarget.getAttribut('href'))
 *  5. Slice the current id to remove the # symbol using ID.slice(1) string method
 *  6. Select the current element by the id recieved (element = document.getElementById(ID)). This gived you the element on which the ID points to
 *  7. Get the heights of both the navigation element and the list container element using getBoundingClientRect() property
 *  8. Get the position that the link is supposed to scroll to using the code (position = element.offsetTop - navigation element height)
 *  9. Check if the navigation element contains the sticky or fixed nav class
 *  10. If !fixed or !sticky class, then position = position - navigation height, if navigation height > 82, then position = position + container height
 *  11. Scroll to the specified coordinate using the code window.scrollTo({left:0, top:(the position)})
 *
 * }
 */

scrollLinks.forEach(function (link, i) {
  link.addEventListener('click', function (e) {
    // 1. Prevent the default behaviour of the links
    e.preventDefault();

    // 2. Navigate to a specific coordinate
    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);

    if (element === null) {
      alert('The element is yet to be added');
    }

    // 3. Calculate the heights
    const navigationHeight = navigation.getBoundingClientRect().height;
    const containerHeight = listContainer.getBoundingClientRect().height;

    // 4. Get the position to scroll to
    let position = element.offsetTop - navigationHeight;

    // 5. Check for the fixed navigation class
    const fixedNav = navigation.classList.contains('sticky');

    if (!fixedNav) position = position - navigationHeight;
    if (navigationHeight > 82) position = position + containerHeight;

    // 6. Scroll to the specified coordinates
    window.scrollTo({
      left: 0,
      top: position,
    });

    // 7. Hide the navigation on smaller screens
    listContainer.style.height = 0;
  });
});
