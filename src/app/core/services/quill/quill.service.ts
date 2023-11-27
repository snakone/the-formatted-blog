import { Injectable } from '@angular/core';
import { Post } from '@shared/types/interface.post';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { CrafterService } from '../crafter/crafter.service';
import { ERROR_CONVERT_HTML_SENTENCE, NO_DATA_CONVERT_HTML_SENTENCE } from '@shared/data/sentences';
import { APP_CONSTANTS } from 'app/app.config';
import { SnackTypeEnum } from '@shared/types/types.enums';

@Injectable()

export class QuillService {

  constructor(private crafter: CrafterService) { }

  public convertToHTML(post: Post): void {
    if (!post.message.ops) {
      this.crafter.setSnack(NO_DATA_CONVERT_HTML_SENTENCE, SnackTypeEnum.WARNING);
      return;
    }

    const converted = new QuillDeltaToHtmlConverter(post.message.ops, {
      multiLineParagraph: false
    }).convert();

    try {
      const parser = new DOMParser();
      const input = document.createElement('a');
      const doc = parser.parseFromString(converted, "text/html");
      const styled = this.addStyles(doc.documentElement.outerHTML, post);
      input.setAttribute('href', 'data:html; charset=utf-8,' + styled)
      input.setAttribute('download', `${post.title}.html`);
      input.click();
    } catch (err) {
      this.crafter.setSnack(ERROR_CONVERT_HTML_SENTENCE, SnackTypeEnum.ERROR);
    }
  }

  private addStyles(html: string, post: Post): string {
    return html.replace('<body>', addTitle(post))
               .replace('<head></head>', POST_STYLES_STRING)
               .replace('</body>', addFooter());
  }

}

const addTitle = (post: Post) => 
`<body>
  <div id="draft" style="width: 100%">
    <h1>${post.title}</h1>
    <span class="title">Escrito por ${post.author}</span>
    <img onerror="this.src='https://th.bing.com/th/id/OIP.vDf037OKUo0H03weRxdWuAHaHa?pid=ImgDet&rs=1'" alt="Post Image" src="${post.cover}"/>`;

const addFooter = () => `  
  </div>
  <footer>
      <b>The Formatted Blog</b>. 
      Copyright © ${new Date().getFullYear().toString()} - 
      All Rights Reserved - ${APP_CONSTANTS.APP_VERSION}
  </footer>
</body>`;

const POST_STYLES_STRING = `
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.2.0/css/all.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
  <style>
  
  /*****************************************************************/
  /* CUSTOM STYLES - DO NOT EDIT TO KEEP SAME FORMATTED BLOG STYLE */
  /*****************************************************************/

    * {
      margin: 0;
      padding: 0;
    }

    body {
      max-width: 950px;
      margin: 0 auto;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
    }

    p, ul, ol, span.title, h1, h2, h3, footer {
      font-family: 'Raleway', sans-serif;
    }
    
    p {
      margin: 0 0 30px;
      text-align: left;
    }

    blockquote {
      margin: 36px 0 35px;
      background: rgb(255, 253, 189);
      padding: 15px 22px 15px 25px;
      transition: background 666ms ease-in-out;
      font-style: italic;
      font-size: 16px;
      border-left: 5px solid rgb(0, 28, 155);
      color: rgb(59, 57, 57);
    }

    blockquote:first-child { margin-top: 0; }

    ul {
      margin: 36px 0 35px;
      list-style: none;
    }
  
    ul li {
      margin: 12px 0;
      position: relative;
      padding-left: 24px;
    }

    ul li::before {
      position: absolute;
      left: 0;
      top: 0;
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      content: "\\f0da";
      display: inline-block;
      font-style: normal;
      font-variant: normal;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      font-size: 20px;
      color: rgb(0, 28, 155);
    }
  
    ul:first-child { margin-top: 0 }

    ol {
      counter-reset: my-counter;
      margin: 36px 0 35px;
      list-style: none;
    }

    ol:first-child { margin-top: 0 }

    ol li {
      margin: 12px 0;
      position: relative;
      padding-left: 27px;
      counter-increment: my-counter;
    }

    ol li::before {
      content: counter(my-counter);
      position: absolute;
      left: 0;
      top: -2px;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      font-size: 20px;
      color: rgb(0, 28, 155);
    }

    span.title {
      font-size: 11px;
      opacity: .8;
      margin-bottom: 12px;
      display: inline-block;
      padding-left: 3px;
    }

    h1 {
      margin: 28px 0 2px 0;
    }

    h2 {
      margin: 45px 0 30px 0;
      position: relative;
      scroll-margin-top: 30px;
    }

    h3 {
      margin: 30px 0 25px 0;
      position: relative;
      scroll-margin-top: 25px;
    }

    h2::before {
      content: '';
      position: absolute;
      bottom:-2px;
      left: 0;
      width: 20px;
      height: 3px;
      background: rgb(0, 28, 155);
    }

    h2:first-child { margin-top: 0; }

    pre {
      margin: 36px 0 35px;
      background-color: rgb(35, 36, 31);
      color: rgb(248, 248, 242); 
      white-space: pre-wrap;
      padding: 5px 10px;
    }

    pre:first-child { margin-top: 0; }
  
    img {
      max-width: 100%;
      display: block;
      margin: 14px 0 30px;
    }

    img:last-child { margin-bottom: 0 }

    footer {
      position: relative;
      width: 100%;
      bottom: 0;
      left: 0;
      text-align: center;
      margin: auto 0 0 0;
      font-size: 12px;
      font-weight: 400;
      padding-bottom: 12px;
    }
  </style>
</head>
`;

