// Song list with online audio URLs
const songs = [
    { name: "Song 1", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "Song 2", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { name: "Song 3", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];

// Node for doubly circular linked list
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

// Doubly circular linked list
class DoublyCircularLinkedList {
    constructor() {
        this.head = null;
        this.current = null;
    }

    // Add song to the playlist
    add(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.head.next = this.head;
            this.head.prev = this.head;
        } else {
            const last = this.head.prev;
            last.next = newNode;
            newNode.prev = last;
            newNode.next = this.head;
            this.head.prev = newNode;
        }
    }

    // Set current to head
    playFirstSong() {
        this.current = this.head;
        this.playSong();
    }

    // Play current song
    playSong() {
        const audioPlayer = document.getElementById("audioPlayer");
        audioPlayer.src = this.current.data.src;
        audioPlayer.play();
        this.highlightCurrentSong();
    }

    // Next song
    nextSong() {
        this.current = this.current.next;
        this.playSong();
    }

    // Previous song
    prevSong() {
        this.current = this.current.prev;
        this.playSong();
    }

    // Highlight the current song in the playlist
    highlightCurrentSong() {
        const allSongs = document.querySelectorAll("#playlist div");
        allSongs.forEach(song => song.classList.remove("current"));
        document.querySelector(`[data-song="${this.current.data.name}"]`).classList.add("current");
    }
}

const playlist = new DoublyCircularLinkedList();

// Populate playlist and add to the linked list
const playlistDiv = document.getElementById("playlist");
songs.forEach(song => {
    playlist.add(song);
    const songDiv = document.createElement("div");
    songDiv.innerText = song.name;
    songDiv.setAttribute("data-song", song.name);
    playlistDiv.appendChild(songDiv);
});

// Play first song
playlist.playFirstSong();

// Event listeners for next and previous buttons
document.getElementById("next").addEventListener("click", () => playlist.nextSong());
document.getElementById("prev").addEventListener("click", () => playlist.prevSong());

// Play song on click from the playlist
document.getElementById("playlist").addEventListener("click", (e) => {
    if (e.target && e.target.nodeName == "DIV") {
        const songName = e.target.getAttribute("data-song");
        playlist.current = playlist.head;
        while (playlist.current.data.name !== songName) {
            playlist.current = playlist.current.next;
        }
        playlist.playSong();
    }
});
