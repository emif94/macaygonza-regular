function mobileCover() {  
  $(".parallax-portada").parallax({
    imageSrc: "assets/img/portada-mobile.jpeg",
  });

  // Render HTML for portada-mobile.jpeg
  $("#changeImg").html(`
    <a href="assets/img/galeria/macaygonza4.jpg" data-fancybox="images" data-caption="">
      <img class="img-fluid" src="assets/img/galeria/macaygonza4.jpg" alt="">
    </a>
  `);
}

$(document).ready(function() {
  function handleScreenChange() {
    if ($(window).width() <= 760) {
      mobileCover();
    } else {
      // Portada parallax PC
      $(".parallax-portada").parallax({
        imageSrc: "assets/img/portada-hd-copia.png",
      });

      // Render HTML for portada-hd-copia.png
      $("#changeImg").html(`
        <a href="assets/img/galeria/macaygonza3.png" data-fancybox="images" data-caption="">
          <img class="img-fluid" src="assets/img/galeria/macaygonza3.png" alt="">
        </a>
      `);
    }
  }

  // Call handleScreenChange on document ready and window resize
  $(window).on("resize", handleScreenChange);
  handleScreenChange(); // Call initially on document ready
});



// Instagram parallax
$(".parallax-instagram").parallax({
  imageSrc: "assets/img/flores4.jpeg",
});



// ----------------------

// Cuenta Regresiva:

 // Set the date we're counting down to
 const countDownDate = new Date("2024-03-02T18:45:00").getTime();

 // Update the countdown every 1 second
 const x = setInterval(function() {
     const now = new Date().getTime();
     const distance = countDownDate - now;

     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

     document.getElementById("days").innerText = days.toString().padStart(2, '0');
     document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
     document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
     document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

     if (distance < 0) {
         clearInterval(x);
         document.getElementById("countdown").innerHTML = "EXPIRED";
     }
 }, 1000);

// ----------------------

// musica

var audios = document.getElementById("audioPrueba");
var playAudio = () => {
  audios.play().catch((error) => {
    console.log(
      "La reproducción automática no está permitida. Haz clic en la página para reproducir el audio."
    );
    return false;
  });
  $("#btnPlay").addClass("hidden");
  $("#btnPausa").removeClass("hidden");
  $("#btnPausa").addClass("rotate");
};
var pauseAudio = () => {
  audios.pause();
  $("#btnPausa").addClass("hidden");
  $("#btnPlay").removeClass("hidden");
  $("#btnPlay").addClass("beat");
};

// ----------------------

// Agendar en calendarios

var calendarioPrueba = () => {
  formatGoogleCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatMicrosoftOfficeCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatOutlookCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatAppleCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatYahooCalendarLink(fechaInicioEvento, fechaFinEvento);
};

function formatDateToISO8601(inputDate) {
  const date = new Date(inputDate);
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}

function formatDateToICS(inputDate, zona) {
  const date = new Date(inputDate);
  zona ? date.setHours(date.getHours() - 3) : null;
  const formattedDate = date
    .toISOString()
    .replace(/[:-]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
  return formattedDate; 
}

function formatGoogleCalendarLink(startDate, endDate) {
  const formattedStartDate = formatDateToICS(startDate);
  const formattedEndDate = formatDateToICS(endDate);
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarGoogle").attr(
    "href",
    `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${formattedStartDate}%2F${formattedEndDate}&text=${formattedTituloEvento}&text=${formattedTituloEvento}`
  );
}

function formatOutlookCalendarLink(startDate, endDate) {
  const formattedStartDate = encodeURIComponent(formatDateToISO8601(startDate));
  const formattedEndDate = encodeURIComponent(formatDateToISO8601(endDate));
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarOutlook").attr(
    "href",
    `https://outlook.live.com/calendar/0/action/compose?allday=false&enddt=${formattedEndDate}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${formattedStartDate}&subject=${formattedTituloEvento}`
  );
}

function formatMicrosoftOfficeCalendarLink(startDate, endDate) {
  const formattedStartDate = encodeURIComponent(formatDateToISO8601(startDate));
  const formattedEndDate = encodeURIComponent(formatDateToISO8601(endDate));
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarMicrosoft365").attr(
    "href",
    `https://outlook.office.com/calendar/action/compose?allday=false&enddt=${formattedEndDate}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${formattedStartDate}&subject=${formattedTituloEvento}`
  );
}

function formatAppleCalendarLink(startDate, endDate) {
  const formattedStartDate = formatDateToICS(startDate);
  const formattedEndDate = formatDateToICS(endDate);
  const formattedTituloEvento = encodeURIComponent(tituloEvento).replace(
    /%20/g,
    " "
  );
  $("#LinkCalendarApple").attr(
    "href",
    `data:text/calendar;charset=utf-8,${encodeURIComponent(
      `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:Evento\nDTSTART:${formattedStartDate}\nDTEND:${formattedEndDate}\nSUMMARY:${formattedTituloEvento}\nEND:VEVENT\nEND:VCALENDAR`
    )}`
  );
}

function formatYahooCalendarLink(startDate, endDate) {
  const formattedStartDate = formatDateToICS(startDate, true);
  const formattedEndDate = formatDateToICS(endDate, true);
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarYahoo").attr(
    "href",
    `https://calendar.yahoo.com/?dur=&et=${formattedEndDate}&st=${formattedStartDate}&title=${formattedTituloEvento}&v=60`
  );
}


//GONZA HEAD
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#bowTie').addEventListener('click', function() {
    var gonzaHead = document.querySelector('#gonzaHead');
    gonzaHead.style.opacity = 1;
  });
});


// ----------------------

// EJECUCIONES AUTOMATICAS

calendarioPrueba();

// ----------------------