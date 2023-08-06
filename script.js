(function(){

    // function for calculating left items
    function calculateLeft() {
        // done items
        let n = document.getElementsByClassName('done').length;
        // left items
        c = todoItems.length - n;

        return c;
    }

    // function for marking todos as complete
    function markDoneJobs() {
        for(let i = 0; i < todoBtn.length; i++) {
            todoBtn[i].addEventListener('click', () => {
            todoItems[i].classList.toggle('done');

            leftItems.textContent = calculateLeft();

            })
        };
    }

    // function for showing cross icon in every li element once hovered
    function showCross() {
        if(screen.width > 440) {
            for(let i = 0; i < todoItems.length; i++) {
                todoItems[i].addEventListener('mouseover', () => {
                    cross[i].style.display = 'block';
                 })

                todoItems[i].addEventListener('mouseleave', () => {
                    cross[i].style.display = 'none';
                })
            };
        }
        
    }

    // function for deleting todos from list
    function deleteTodo() {

        for(let i = 0; i < cross.length; i++) {
            cross[i].addEventListener('click', (e) => {
                e.target.parentNode.parentNode.removeChild(e.target.parentNode);
                // updating the number of todos
                todoItems = document.querySelectorAll('li');
                leftItems.textContent = calculateLeft();
            })
        }
        
    }

    let todoBtn = document.querySelectorAll('li button');
    let todoItems = document.querySelectorAll('li');
    const addTodo = document.querySelector('.addTodo button');
    const addInput = document.getElementById('addInput');
    const filterBtns = document.querySelectorAll('.filters button');
    const allBtn = document.getElementById('all');
    const activeBtn = document.getElementById('active');
    const completedBtn = document.getElementById('completed');
    const leftItems = document.querySelector('.left');
    const clearComplete = document.getElementById('clear');
    const sunIcon = document.getElementById('light');
    const moonIcon = document.getElementById('dark');
    let cross = document.querySelectorAll('li img');

    leftItems.textContent = calculateLeft();
    
    markDoneJobs();

    // event for adding a new todo
    addTodo.addEventListener('click', () => {
        if(addInput.value != '') {
            document.querySelector('ul').innerHTML += `
                <li>
                    <div><button type="button"></button></div>
                    <p>${addInput.value}</p>
                    <img src="./images/icon-cross.svg" alt="cross">
                </li>
            `
            
            // updating the number of todos
            todoBtn = document.querySelectorAll('li button');
            todoItems = document.querySelectorAll('li');
            cross = document.querySelectorAll('li img');

            showCross();
           
            leftItems.textContent = calculateLeft();

            markDoneJobs();

            deleteTodo();


        }
        
        addInput.value = ''
    });

    addInput.addEventListener('keypress', (e) => {
    
        if(e.key == "Enter") {
            addTodo.click();
        }
        
    });


    showCross();

    deleteTodo();
    
    // event for filter buttons
    for(let i = 0; i < filterBtns.length; i++) {
        filterBtns[i].addEventListener('click', () => {
            for(let i = 0; i < filterBtns.length; i++) {
                filterBtns[i].classList.remove('active');
            }
            filterBtns[i].classList.add('active');

        })
    };

    activeBtn.addEventListener('click', () => {

        for(let i = 0; i < todoItems.length; i++) {
            if(todoItems[i].classList.contains('done')) {
                todoItems[i].style.display = 'none';
            } else {
                todoItems[i].style.display = 'flex';
            }
        } 


    });

    completedBtn.addEventListener('click', () => {

        for(let i = 0; i < todoItems.length; i++) {
            if(!todoItems[i].classList.contains('done')) {
                todoItems[i].style.display = 'none';
            } else {
                todoItems[i].style.display = 'flex';
            }
        }

        
    });

    allBtn.addEventListener('click', () => {

        for(let i = 0; i < todoItems.length; i++) {
            todoItems[i].style.display = 'flex';
        } 

    });

    // event for clearing all completed todos
    clearComplete.addEventListener('click', () => {
        for(let i = 0; i < todoItems.length; i++) {
            if(todoItems[i].classList.contains('done')) {
                todoItems[i].style.display = 'none';
            }
        }
    });

    // event for changing theme
    sunIcon.addEventListener('click', () => {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        document.body.classList.add('light-theme');
    });

    moonIcon.addEventListener('click', () => {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        document.body.classList.remove('light-theme');
    })

        // making the list draggable
        let items = document.querySelectorAll('ul li');
    
        items.forEach((item) => {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
            item.addEventListener('dragenter', handleDragEnter);
            item.addEventListener('dragleave', handleDragLeave);
            item.addEventListener('drop', handleDrop);
            item.addEventListener('dragover', handleDragOver);
        });

        function handleDragStart(e) {
            this.style.opacity = '0.4';

            dragSrcEl = this;

            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        }

        function handleDragEnd(e) {
            this.style.opacity = '1';
        }

        function handleDragEnter(e) {
            this.classList.add('over');   
        }

        function handleDragLeave(e) {
            this.classList.remove('over');
        }

        function handleDrop(e) {

            e.stopPropagation();  // stops the browser from redirecting

            if(dragSrcEl !== this) {
                dragSrcEl.innerHTML = this.innerHTML;
                this.innerHTML = e.dataTransfer.getData('text/html');
            }

            setTimeout(() => {
                this.classList.remove('over');
            }, 200);
        }

        // prevent the default action for dragover which sets the dropEffect to 'none'
        function handleDragOver(e) {
            e.preventDefault();  // 
        }

    


}) ();