'use strict';

// document.getElementById('test-button').addEventListener('click', function () {
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
// });
{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorSideLink: Handlebars.compile(document.querySelector('#template-author-side-link').innerHTML),
  };

  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      articles: '.post',
      titles: '.post-title',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      tags: '.post-tags .list',
      author: '.post-author',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

  // const opt = {
  //   ArticleSelector: '.post',
  //   TitleSelector: '.post-title',
  //   TitleListSelector: '.titles',
  //   ArticleTagsSelector: '.post-tags .list',
  //   ArticleAuthorSelector: '.post-author',
  //   TagsListSelector: '.tags.list',
  //   CloudClassCount: 5,
  //   CloudClassPrefix: 'tag-size-',
  //   AuthorsListSelector: '.authors.list',
  // };

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

  const generateTitleLinks = function (customSelector = '') {
    // console.log('Generowanie linków działa!');

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';

    /* [DONE] for each article */
    const articles = document.querySelectorAll(select.all.articles + customSelector);
    // console.log(select.all.articles + customSelector);

    let html = '';

    for (let article of articles) {

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE] find the title element & get the title from the title element*/
      const articleTitle = article.querySelector(select.all.titles).innerHTML;

      /* [DONE] create HTML of the link */
      // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      const linkHTMLData = {
        id: articleId,
        title: articleTitle
      };
      const linkHTML = templates.articleLink(linkHTMLData);
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

  const calculateTagsParmams = function (tags) {
    const params = {};
    params.max = 1;
    params.min = 999999;
    // console.log(params);

    for (let tag in tags) {
      // console.log(tag + ' is used ' + tags[tag] + ' times');
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }

    return params;
  };

  const calculateTagClass = function (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opts.tagSizes.count - 1) + 1);
    return opts.tagSizes.classPrefix + classNumber;
  };


  const generateTags = function () {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tags = article.querySelector(select.article.tags);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {

        /* generate HTML of the link */
        // const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
        const linkHTMLData = {
          tag: tag
        };
        const linkHTML = templates.tagLink(linkHTMLData);

        /* add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if (!Object.prototype.hasOwnProperty.call(allTags, tag)) {
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tags.innerHTML = html;

      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);

    /* [NEW] add html from allTags to tagList */
    // tagList.innerHTML = allTags.join(' ');
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParmams(allTags);
    // console.log('tagsParams:', tagsParams);

    // let allTagsHTML = '';
    const allTagsData = {
      tags: []
    };

    /* [NEW] START LOOT: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      // allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li> ';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }

    /* [NEW] add html from allTagsHTML to tagList */
    // tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
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
    const tags = document.querySelectorAll('.post-tags a');
    const sideTags = document.querySelectorAll('.tags a');

    /* START LOOP: for each link */
    for (let tag of tags) {
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */

      for (let sideTag of sideTags) {
        /* add tagClickHandler as event listener for that link */
        sideTag.addEventListener('click', tagClickHandler);

        /* END LOOP: for each link */
      }
    }
  };

  addClickListenersToTags();


  const generateAuthors = function () {
    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find author wrapper */
      const author = article.querySelector(select.article.author);

      /* make html variable with empty string */
      let html = '';

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');

      if (!Object.prototype.hasOwnProperty.call(allAuthors, articleAuthor)) {
        /* [NEW] add generated code to allAuthors array */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      // console.log(allAuthors);

      /* generate HTML of the link */
      // const linkHTML = 'by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      const linkHTMLData = {
        author: articleAuthor,
      };
      const linkHTML = templates.authorLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* insert HTML of all the links into the authors wrapper */
      author.innerHTML = html;

      /* END LOOP: for every article: */
    }
    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector(select.listOf.authors);

    // let allAuthorsHTML = '';
    const allAuthorsData = {
      authors: []
    };

    /* [NEW] START LOOT: for each author in allAuthors: */
    for (let author in allAuthors) {
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      // allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li> ';
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
      });
    }
    console.log(allAuthorsData);
    /* [NEW] add html from allAuthorsHTML to authorList */
    // authorList.innerHTML = allAuthorsHTML;
    authorList.innerHTML = templates.authorSideLink(allAuthorsData);
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
    const authors = document.querySelectorAll('.post-author a');
    const sideAuthors = document.querySelectorAll('.authors a');

    /* START LOOP: for each link */
    for (let author of authors) {
      /* add authorClickHandler as event listener for that link */
      author.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }

    for (let sideAuthor of sideAuthors) {
      /* add authorClickHandler as event listener for that link */
      sideAuthor.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();

}
