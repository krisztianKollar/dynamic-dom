const BASE_URL = 'https://jsonplaceholder.typicode.com';

let usersDivEl;
let postsDivEl;

let loadButtonEl;

function createPostsList(posts) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
      
        // creating paragraph
        const strongEl = document.createElement('strong'); 
        strongEl.textContent = post.title;  
        strongEl.addEventListener("click", onLoadComments);
        strongEl.id = post.id;    
        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(document.createTextNode(`: ${post.body}`));
        const comments = document.createElement("div"); 
        comments.id = "comment" + post.id;       

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);
        liEl.appendChild(comments);   
        ulEl.appendChild(liEl);
    }
    return ulEl;
}

function onPostsReceived() {
    showContents(["posts"]);

    const text = this.responseText;
    const posts = JSON.parse(text);

    const divEl = document.getElementById('posts-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPostsList(posts));
}

function onLoadPosts() {
    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPostsReceived);
    xhr.open('GET', BASE_URL + '/posts?userId=' + userId);
    xhr.send();
}

function createUsersTableHeader() {
    const idTdEl = document.createElement('td');
    idTdEl.textContent = 'Id';

    const nameTdEl = document.createElement('td');
    nameTdEl.textContent = 'Name';

    const trEl = document.createElement('tr');
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createUsersTableBody(users) {
    const tbodyEl = document.createElement('tbody');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // creating id cell
        const idTdEl = document.createElement('td');
        idTdEl.textContent = user.id;

        // creating name cell
        const dataUserIdAttr = document.createAttribute('data-user-id');
        dataUserIdAttr.value = user.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = user.name;
        buttonEl.setAttributeNode(dataUserIdAttr);
        buttonEl.addEventListener('click', onLoadPosts);

        const buttonAEl = document.createElement('button');
        buttonAEl.textContent = "albums";
        buttonAEl.id = user.id;
        buttonAEl.addEventListener('click', onLoadAlbums);

        
        const nameTdEl = document.createElement('td');
        nameTdEl.appendChild(buttonEl);
        const albumTdEl = document.createElement('td');
        albumTdEl.appendChild(buttonAEl);
        // creating row
        const trEl = document.createElement('tr');
        trEl.appendChild(idTdEl);
        trEl.appendChild(nameTdEl);
        trEl.appendChild(albumTdEl);

        tbodyEl.appendChild(trEl);
    }

    return tbodyEl;
}

function createUsersTable(users) {
    const tableEl = document.createElement('table');
    tableEl.appendChild(createUsersTableHeader());
    tableEl.appendChild(createUsersTableBody(users));
    return tableEl;
}

function onUsersReceived() {
    loadButtonEl.remove();

    const text = this.responseText;
    const users = JSON.parse(text);

    const divEl = document.getElementById('users-content');
    divEl.appendChild(createUsersTable(users));
}

function onLoadUsers() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onUsersReceived);
    xhr.open('GET', BASE_URL + '/users');
    xhr.send();
}

function onLoadComments() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', createCommentsList);
    xhr.open('GET', BASE_URL + '/comments?postId=' + this.id);
    xhr.send();
}

//function onCommentsReceived() {
    //commentsDivEl.style.display = 'block';

    //const text = this.responseText;
   // const comments = JSON.parse(text);

    //const divEl = document.getElementById('comments-content');
    //while (document.getElementById("comments-content").firstChild) {
       // document.getElementById("comments-content").removeChild(document.getElementById("comments-content").firstChild);
    //}
    
//}

function createCommentsList() {

    const text = this.responseText;
    const comments = JSON.parse(text);
    const ulEl = document.createElement('ul');
    const commentsDiv = document.getElementById("comment" + comments[0].postId);
   if (commentsDiv.firstChild){
       while (commentsDiv.firstChild) {
        commentsDiv.removeChild(commentsDiv.firstChild);
       }
   } else {

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];

        // creating paragraph
        const strongEl = document.createElement('strong'); 
        strongEl.innerHTML = comment.email + ":<br>"; 

        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(document.createTextNode(`${comment.body}`));

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
        commentsDiv.appendChild(ulEl);
    }
}
    
}

function createAlbumsList(albums) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];

        // creating paragraph
        const strongEl = document.createElement('strong'); 
        strongEl.innerHTML = album.title; 
        strongEl.id = album.id; 
        strongEl.addEventListener("click", onLoadPhotos)

        const pEl = document.createElement('p');
        pEl.id = "album" + album.id;
        pEl.appendChild(strongEl);

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }
    return ulEl;
}

function onLoadPhotos() {
    
    const albumId = this.getAttribute('id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', createPhotosList);
    xhr.open('GET', BASE_URL + '/photos?albumId=' + albumId);
    xhr.send();
}

function createPhotosList() {

    const text = this.responseText;
    const photos = JSON.parse(text);
    const ulEl = document.createElement('ul');
    const photosDiv = document.getElementById("album" + photos[0].albumId);
   if (photosDiv.firstChild.nextSibling){
       while (photosDiv.firstChild.nextSibling) {
        photosDiv.removeChild(photosDiv.firstChild.nextSibling);
       }
   } else {
        photosDiv.appendChild(document.createElement("br"))
        for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];

            // creating paragraph
            const imgEl = document.createElement('img'); 
            imgEl.src = photo.thumbnailUrl; 
            photosDiv.appendChild(imgEl);
        }
}
}

function onAlbumsReceived() {
    showContents(["albums"]);
    const text = this.responseText;
    const albums = JSON.parse(text);
    const divEl = document.getElementById('albums-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createAlbumsList(albums));
}

function onLoadAlbums() {
    const el = this;
    const userId = el.getAttribute('id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAlbumsReceived);
    xhr.open('GET', BASE_URL + '/albums?userId=' + userId);
    xhr.send();
}

function showContents(ids) {
    const contentEls = document.getElementsByClassName('content');
    for (let i = 0; i < contentEls.length; i++) {
        const contentEl = contentEls[i];
        if (ids.includes(contentEl.id)) {
            contentEl.classList.remove('hidden');
        } else {
            contentEl.classList.add('hidden');
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    usersDivEl = document.getElementById('users');
    postsDivEl = document.getElementById('posts');
    loadButtonEl = document.getElementById('load-users');
    loadButtonEl.addEventListener('click', onLoadUsers);
});