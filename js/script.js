'use strict';

// document.getElementById('test-button').addEventListener('click', function () {
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
// });
{
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    // console.log('Link was clicked!');
    // console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    // console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const href = clickedElement.getAttribute('href');
    // console.log(href);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const article = document.querySelector(href);
    // console.log(article);

    /* [DONE] add class 'active' to the correct article */
    article.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  const generateTitleLinks = function (customSelector = '') {
    // console.log('Generowanie linków działa!');

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles) {

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE] find the title element & get the title from the title element*/
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      // console.log(linkHTML);

      /* [DONE] insert link into titleList */
      html = html + linkHTML;
      // console.log(html);

      /* insertAdjacentHTML exercise */
      // titleList.insertAdjacentHTML('beforeend', linkHTML);
    }

    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    // console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const generateTags = function () {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tags = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';

        /* add generated code to html variable */
        html = html + linkHTML;

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tags.innerHTML = html;

      /* END LOOP: for every article: */
    }
  };

  generateTags();

  const tagClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks) {

      /* remove class active */
      activeLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tags = document.querySelectorAll('a[href="' + href + '"]');
    console.log(tags);
    /* START LOOP: for each found tag link */
    for (let tag of tags) {

      /* add class active */
      tag.classList.add('active');

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function () {
    /* find all links to tags */
    const links = document.querySelectorAll('.post-tags a');

    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  const generateAuthors = function () {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find author wrapper */
      const author = article.querySelector(optArticleAuthorSelector);

      /* make html variable with empty string */
      let html = '';

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');

      /* generate HTML of the link */
      const linkHTML = 'by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';

      /* add generated code to html variable */
      html = html + linkHTML;

      /* insert HTML of all the links into the tags wrapper */
      author.innerHTML = html;

      /* END LOOP: for every article: */
    }
  };

  generateAuthors();

  const authorClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all tag links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */
    for (let activeLink of activeLinks) {

      /* remove class active */
      activeLink.classList.remove('active');

      /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const authors = document.querySelectorAll('a[href="' + href + '"]');
    console.log(authors);
    /* START LOOP: for each found tag link */
    for (let author of authors) {

      /* add class active */
      author.classList.add('active');

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function () {
    /* find all links to authors */
    const links = document.querySelectorAll('.post-author a');

    /* START LOOP: for each link */
    for (let link of links) {
      /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();
}

