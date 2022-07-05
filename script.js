
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('header h2');
const cdThumd = $('.cd-thumb');
const audio = $('#audio');

const btnPlay = $('.btn-toggle-play');
const player = $('.player')

const progress = $('#progress')

const cd = $('.cd')
const cdwidth = cd.offsetWidth; //lay chieu rong mac dinh cua cd
const app = {
    currentIndex: 0, // lay ra bai hat dau tien cua mảng
    isPlaying : false, //pause
    songs: [
        {
            name: 'I Love You But..',
            singer: 'Eenie Meenie',
            path: './asset/music/i_love_you_but_eenie_meenie_cover_by_ray_lyrics_402028993587679162.mp3',
            image: './asset/img/Iloveyoubut.jpg'

        },
        {
            name: 'song1',
            singer: 'hoangdung',
            path: './asset/music/song1.mp3',
            image: './asset/img/song1.jpg'

        },
        {
            name: 'song2',
            singer: 'hoangdung',
            path: './asset/music/song2.mp3',
            image: './asset/img/song2.jpg'

        },
        {
            name: 'song3',
            singer: 'hoangdung',
            path: './asset/music/song3.mp3',
            image: './asset/img/song3.jpg'

        },
        {
            name: 'song4',
            singer: 'hoangdung',
            path: './asset/music/song4.mp3',
            image: './asset/img/song4.jpg'

        },
        {
            name: 'song4',
            singer: 'hoangdung',
            path: './asset/music/song4.mp3',
            image: './asset/img/song4.jpg'

        },
        {
            name: 'song4',
            singer: 'hoangdung',
            path: './asset/music/song4.mp3',
            image: './asset/img/song4.jpg'

        },


    ],
    render: function () {
        const htmls = this.songs.map(song => {
            return ` 
<div class="song">
  <div class="thumb" style="background-image: url('${song.image}')">
  </div>
  <div class="body">
    <h3 class="title">${song.name}</h3>
    <p class="author">${song.singer}</p>
  </div>
  <div class="option">
    <i class="fas fa-ellipsis-h"></i>
  </div>
</div>
`
        })
        $('.playlist').innerHTML = htmls.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    loadCurrentSong: function () {

        console.log(heading, cdThumd, audio)
        heading.textContent = this.currentSong.name
        cdThumd.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path

    },
    handleEvent: function () {
        const _this = this
        //xu li cd quay
        const cdAnimate = cdThumd.animate([
            {transform: 'rotate(360deg'}
        ],{
            duration : 10000, // 10second
            interations: Infinity
        })
        //cdAnimate.pause()


        //xu li kich thuoc to nho khi scroll
        document.onscroll = function () {

            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newWidth = cdwidth - scrollTop;

            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0 // nếu lớn hơn 0 thì vẫn giảm kích thước nhỏ hơn 0  thì = 0 (ẩn đi)
            cd.style.opacity = newWidth / cdwidth // làm mờ dần khi kéo

        
        }
        //xu li khi play
        btnPlay.onclick = function(){
            if(_this.isPlaying){
            _this.isPlaying = false
            audio.pause();
            player.classList.remove('playing');
            cdAnimate.pause();
            }else{
            _this.isPlaying = true
            audio.play();   
            player.classList.add('playing');
            cdAnimate.play();
            }

            audio.ontimeupdate = function(){
                if(audio.duration){
                    const progressPercent = Math.floor((audio.currentTime / audio.duration *100 ))
                    progress.value  = progressPercent
                }
                
            }
            
        }    
        // xu li khi skip tua bai hat
        progress.onchange = function(e){
         const seekTime = audio.duration / 100 * e.target.value ;
         audio.currentTime = seekTime;

        }
    },
    start: function () {
        this.handleEvent();
        this.defineProperties();
        this.loadCurrentSong();
        this.render();
    }
}
app.start();
