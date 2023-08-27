const languagesColorsMap = {
    "c++": "#3572A5",
    "css": "#563D7C",
    "javascript": "#F1E05A",
    "html": "#E34C26",
    "php": "#4F5D95"
}

const info = {
    'projects': [
        {
            'title': "Chess Game",
            'img': 'src/media/project-1.png',
            'description': 'Console Chess Game, not done yet!, im working on it when i have time no more. (not done yet) Console Chess Game, not done yet!',
            'used-languages': [
                'C++'
            ]
        },
        {
            'title': "EasyUni",
            'img': 'src/media/project-2.png',
            'description': 'My university has a fucked up schedule, im trying to scrape it and make my own, might add more stuff in the future',
            'used-languages': [
                'JavaScript',
                'CSS',
                'Python',
                'HTML',
                'PHP'
            ]
        },
        {
            'title': "Numeric Digit Recognistion",
            'img': 'src/media/project-1.png',
            'description': 'First neural network project that recognizes hand written images (not done yet)',
            'used-languages': [
                'Python'
            ]
        }
    ],
    'programming-skills':[
        {
            "skill-name": "Python",
            "skill-level": 80
        },
        {
            "skill-name": "JavaScript",
            "skill-level": 75
        },
        {
            "skill-name": "C++",
            "skill-level": 60
        },
        {
            "skill-name": "CSS",
            "skill-level": 95
        },
        {
            "skill-name": "React",
            "skill-level": 75
        },
        {
            "skill-name": "HTML",
            "skill-level": 95
        },
        {
            "skill-name": "PHP",
            "skill-level": 85
        },
        {
            "skill-name": "Selenuim",
            "skill-level": 80
        },
        {
            "skill-name": "Laravel",
            "skill-level": 88
        },
        {
            "skill-name": "Django",
            "skill-level": 75
        },
    ],
    'spoken-languages':[
        {
            'percentage': 80,
            'language-name': 'English'
        },
        {
            'percentage': 99,
            'language-name': 'Arabic'
        },
        {
            'percentage': 60,
            'language-name': 'Hebrew'
        }
    ]
}


const toast = $('#liveToastBtn')
const navHeight = document.querySelector('.main-navbar').offsetHeight;
const navLinks = document.querySelectorAll('.nav-link');
const publicKey = 'X64Dur2I_sDYTc_i2';
const contactService = 'service_bnsokmp';
const contactForm = 'template_88uuofj';

emailjs.init(publicKey);


navLinks.forEach(navLink => {
    navLink.addEventListener('click', (event) => {
        const targetId = navLink.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            event.preventDefault(); // Prevent the default anchor link behavior
            const topOffset = targetElement.offsetTop - navHeight;
            document.documentElement.scrollTop = topOffset;
        }
    });
});


function getLanguageColor(language) {
    const langLower = language.toLowerCase();
    return languagesColorsMap[langLower] || "#F34B7D";
}



async function generatePorjectsCards(){
    let projectsBlueprint = $.parseHTML(await $.get( "src/blueprints/project-card.html", function( data ) {
        return data
    }));
    for (let proj of info.projects){
        let clonedBlueprint = $(projectsBlueprint).clone()
        $(clonedBlueprint.find('.card-title')).text(proj.title)
        $(clonedBlueprint.find('.card-text')).text(proj.description)
        $(clonedBlueprint.find('.project-img')).attr("src", proj.img)
        for(let lang of proj["used-languages"]){
            let langWrapper = $('<div class="lang-wrapper d-flex align-items-center"></div>');
            let langColor = getLanguageColor(lang)
            $(langWrapper).append(
                `<span class="lang-circle me-1" style="background-color: ${langColor}"></span>`
            )
            $(langWrapper).append(
                $(`<span class="skill d-flex me-2 align-items-center">${lang[0].toUpperCase() + lang.slice(1)}</span>`)
            );
            $(clonedBlueprint.find('.used-languages')).append(langWrapper)
        }
        $('#projects .projects-centerlizer').append(clonedBlueprint)
    }
}


async function generateSpokenLanguages(){
    let languageCircleBlueprint = $.parseHTML(await $.get( "src/blueprints/language-circle.html", function( data ) {
        return data
    }));
    let languagesList = $('#about-me .languages-list')
    for (let lang of info["spoken-languages"]){
        let clonedBlueprint = $(languageCircleBlueprint).clone()

        var $circle = $(clonedBlueprint).find('.svg .bar');
        let val = lang.percentage;
        let r = $circle.attr('r');
        let c = Math.PI*(r*2);
    
        if (val < 0) { val = 0;}
        if (val > 100) { val = 100;}
        
        let pct = ((100-val)/100)*c;
        
        $circle.css({ strokeDashoffset: pct});
            
        $(clonedBlueprint).attr('data-pct', val);
        $(clonedBlueprint).find('.lang-title').text(lang["language-name"]);
        languagesList.append(clonedBlueprint)
    }
}


async function generateProgrammingLanguagesSkills(){
    let programmingSkillsBlueprint = $.parseHTML(await $.get( "src/blueprints/programming-skills.html", function( data ) {
        return data
    }));
    let len = info["programming-skills"].length;
    let skillsList = info["programming-skills"];
    for(let i = 0; i < len; i+=2){
        let skillsContainer = $('<div class="pair-wrapper d-flex"></div>');
        for(let j = i; j < i+2 && j < len; j++){
            let clonedBlueprint = $(programmingSkillsBlueprint).clone()
            $(clonedBlueprint).find('.skill-title').text(skillsList[j]["skill-name"])
            $(clonedBlueprint).find('.skill-val').css("width", `${skillsList[j]["skill-level"]}%`);
            $(skillsContainer).append(clonedBlueprint)
        }
        $('#about-me .right-side .programming-lanauges').append(skillsContainer)
    }
}


function isEmailValid(email){
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
}


function validateAndPrepare() {
    const fields = [
        { input: $('#contact input[name="fname"]'), name: 'First Name' },
        { input: $('#contact input[name="lname"]'), name: 'Last Name' },
        { input: $('#contact input[name="email"]'), name: 'Email' },
        { input: $('#contact textarea[name="message"]'), name: 'Message' }
    ];
    let valid = true;

    fields.forEach(field => {
        const value = field.input.val().trim();
        const valid = value !== '';
        field.input.toggleClass('is-invalid', !valid);
    });
    
    if (!valid){
        $('#liveToast .toast').addClass('bg-danger')
        $('#liveToast .toast .toast-body').text("Please fill all inputs.")
        return null;
    }
    let email = fields[2].input.val().trim()    
    if (!isEmailValid(email)){
        $('#liveToast .toast').addClass('bg-danger')
        $('#liveToast .toast .toast-body').text("Please enter a valid email.")
        return null;
    }


    const params = {
        full_name: `${fields[0].input.val()} ${fields[1].input.val()}`,
        email: fields[2].input.val(),
        message: fields[3].input.val()
    };
    return params;
}


function isFormReady(){
    valid = true;
    $('#contact input:not([type="submit"])').each((index, input)=>{
        let val;
        val = $(input).val().trim(); 
        valid = !!val // double '!' just to turn it into boolean easly
        if(valid && input.name == "email" && !isEmailValid(val))
            valid = false
    })
    valid = valid && !!$('#contact textarea').val().trim() // double '!' just to turn it into boolean easly
    if(valid){
        $('#contact-form input[type="submit"]').addClass('ready')
        return true;
    }
    $('#contact-form input[type="submit"]').removeClass('ready')
    return false;
}



function sendMail(event){
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function(toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    event.preventDefault();
    let params = validateAndPrepare(toastList);
    if(params){
        emailjs.send(contactService, contactForm, params)
        .then((res) => {
            if(res.status == 200){
                $('#liveToast .toast').addClass('success')
                $('#liveToast .toast .toast-body').text("Email has been sent successfuly!")
                $("#contact-form").trigger("reset");
            }
            else
                throw new Error('Something went wrong.')
        })
        .catch((error) => {
            $('#liveToast .toast').addClass('bg-danger')
            $('#liveToast .toast .toast-body').text("Something went wrong, please try again layer.")
        }).finally(() => {
            toastList.forEach(toast => toast.show());
        });
    }else
        toastList.forEach(toast => toast.show())

}




/****************** event listeners section ******************/

$('.main-header .nav-link').on("click", function() {
    $('.main-header .nav-link.active, .navigator-wrapper .nav-link.active').removeClass("active");
    var clickedHref = $(this).attr("href");
    $('.navigator-wrapper .nav-link[href="' + clickedHref + '"]').addClass("active");
    $(this).addClass("active");
});


$('.navigator-wrapper .nav-link').on( "click", function() {
    if (!$(this).hasClass("active")) { // Check if the clicked link is not already active
        $('.navigator-wrapper .nav-link.active, .main-header .nav-link.active').removeClass("active"); // Remove 'active' class from the previously active link
        var clickedHref = $(this).attr("href"); // Get the clicked link's href attribute
        $('.main-header .nav-link[href="' + clickedHref + '"]').addClass("active");
        $(this).addClass("active"); // Add 'active' class to the clicked link
    }
});


$(window).on('scroll', function() {
    // Calculate the height of the viewport
    var viewportHeight = $(window).height();
    // Loop through each section
    $('main section').each(function() {
      // Calculate the distance from the top of the section to the top of the viewport
      var sectionTop = $(this).offset().top - $(window).scrollTop();
      
      // Check if the section is in the viewport (at least 1/4 of its content is visible)
      if (sectionTop <= viewportHeight * 6/10) {
        // Do something with this section
        // For example, you can add a class to it or trigger a click on a related navigation link
        var sectionId = $(this).attr('id');
        $(`.main-header .main-navbar .nav-link[href="#${sectionId}"`).trigger("click");
      }
    });
  });



$('#contact input:not([type="submit"]), #contact textarea').focusout(isFormReady)
$('#contact input[type="submit"]').on('click', sendMail)
$('#liveToast').on('hidden.bs.toast', function() {
    $(this).find('.toast').removeClass('success').removeClass('bg-danger')
});

generatePorjectsCards()
generateSpokenLanguages()
generateProgrammingLanguagesSkills()