// /* How to Drag 
// 1-> Select Item
// 2-> Left Click on it
// 3-> Drag it to the desired location
// 4-> Release the Left Click.
// */

// let highestZ = 10;

// class Paper {
//     holdingPaper = false;

//     prevMouseX = 0;
//     prevMouseY = 0;

//     curMouseX = 0;
//     curMouseY = 0;

//     velocityX = 0;
//     velocityY = 0;

//     curPaperX = 0;
//     curPaperY = 0;

//     init(paper) {
//         paper.addEventListener('mousedown', (e) => {
//             e.preventDefault(); // Prevent default behavior (text selection)
//             this.holdingPaper = true;  // 'this' is the instance of the class
//             paper.style.zIndex = highestZ;
//             highestZ = highestZ + 1;

//             if (e.button === 0) {
//                 this.prevMouseX = this.curMouseX;
//                 this.prevMouseY = this.curMouseY;
//             }
//         });

//         document.addEventListener('mousemove', (e) => {
//             this.curMouseX = e.clientX;
//             this.curMouseY = e.clientY;

//             this.velocityX = this.curMouseX - this.prevMouseX;
//             this.velocityY = this.curMouseY - this.prevMouseY;

//             if (this.holdingPaper) {
//                 this.curPaperX += this.velocityX;
//                 this.curPaperY += this.velocityY;

//                 this.prevMouseX = this.curMouseX;
//                 this.prevMouseY = this.curMouseY;

//                 paper.style.transform = `translateX(${this.curPaperX}px) translateY(${this.curPaperY}px`;
//             }

//         });

//         window.addEventListener('mouseup', (e) => {
//             this.holdingPaper = false;
//         });

//     }
// }

// const main = document.querySelector('.main');
// const papers = Array.from(main.querySelectorAll('.paper')); // creates an array of the papers

// papers.forEach(paper => {
//     const p = new Paper();
//     p.init(paper); // calls init method for each paper
// });

// document.addEventListener('keydown', (e) => {
//     if (e.shiftKey && e.metaKey && e.key === 'a') {
//         const newPaper = document.createElement('div');
//         newPaper.classList.add('paper');
//         main.appendChild(newPaper);
//         const p = new Paper();
//         p.init(newPaper);
//         papers.push(newPaper);
//     }
// });



let highestZ = 10;

class Paper {
    holdingPaper = false;

    prevX = 0;
    prevY = 0;

    curX = 0;
    curY = 0;

    velocityX = 0;
    velocityY = 0;

    curPaperX = 0;
    curPaperY = 0;

    init(paper) {
        const startDrag = (x, y) => {
            this.holdingPaper = true;
            paper.style.zIndex = highestZ;
            highestZ += 1;

            this.prevX = x;
            this.prevY = y;
        };

        const movePaper = (x, y) => {
            this.curX = x;
            this.curY = y;

            this.velocityX = this.curX - this.prevX;
            this.velocityY = this.curY - this.prevY;

            if (this.holdingPaper) {
                this.curPaperX += this.velocityX;
                this.curPaperY += this.velocityY;

                this.prevX = this.curX;
                this.prevY = this.curY;

                paper.style.transform = `translateX(${this.curPaperX}px) translateY(${this.curPaperY}px)`;
            }
        };

        const endDrag = () => {
            this.holdingPaper = false;
        };

        // Mouse Events
        paper.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if (e.button === 0) {
                startDrag(e.clientX, e.clientY);
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (this.holdingPaper) {
                movePaper(e.clientX, e.clientY);
            }
        });

        window.addEventListener('mouseup', endDrag);

        // Touch Events
        paper.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startDrag(touch.clientX, touch.clientY);
        });

        document.addEventListener('touchmove', (e) => {
            if (this.holdingPaper) {
                const touch = e.touches[0];
                movePaper(touch.clientX, touch.clientY);
            }
        });

        window.addEventListener('touchend', endDrag);
    }
}

const main = document.querySelector('.main');
const papers = Array.from(main.querySelectorAll('.paper'));

papers.forEach((paper) => {
    const p = new Paper();
    p.init(paper);
});

document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.metaKey && e.key === 'a') {
        const newPaper = document.createElement('div');
        newPaper.classList.add('paper');
        main.appendChild(newPaper);
        const p = new Paper();
        p.init(newPaper);
        papers.push(newPaper);
    }
});
