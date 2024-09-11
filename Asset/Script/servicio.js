const carruselContainer = document.querySelector(".carrusel");
let carruselItems = document.querySelectorAll(".carrusel-item");
const buttons = document.querySelectorAll(".carrusel_nav button");

// Clonar los ítems para lograr el bucle continuo
carruselItems.forEach(item => {
    const clone = item.cloneNode(true);
    carruselContainer.appendChild(clone);
});

// Recalcular el maxScrollLeft con los ítems clonados
let maxScrollLeft = carruselContainer.scrollWidth - carruselContainer.clientWidth;
let intervalo = null;
let step = 1;

// Función para iniciar el scroll automático
const start = () => {
    intervalo = setInterval(() => {
        carruselContainer.scrollLeft += step;

        // Si alcanza el final, reiniciar al comienzo
        if (carruselContainer.scrollLeft >= maxScrollLeft) {
            carruselContainer.scrollLeft = 0;
        }
    }, 20);  // Intervalo ajustado
}

// Función para detener el scroll automático
const stop = () => {
    clearInterval(intervalo);
};

carruselContainer.addEventListener("mouseover", stop);
carruselContainer.addEventListener("mouseout", start);

// Iniciar el carrusel
start();

// Añadir eventos a los botones
buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        carruselContainer.scroll({
            left: carruselItems[index].offsetLeft,
            behavior: 'smooth'
        });

        // Cambiar la clase activa en los botones
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        // Cambiar la clase activa en los ítems del carrusel
        carruselItems.forEach(item => item.classList.remove("active"));
        carruselItems[index].classList.add("active");
    });
});

// Recalcular maxScrollLeft si la ventana se redimensiona
window.addEventListener("resize", () => {
    maxScrollLeft = carruselContainer.scrollWidth - carruselContainer.clientWidth;
});
