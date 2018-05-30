$(document).ready(function () {
    "use strict";
    
    // Variable qui récupère les éléments de la liste du menu principal
    var $mainMenuItems = $("#main-menu ul").children("li"),
        
    // Variable qui récupère le nombre d'éléments de la liste du menu principal
        totalMainMenuItems = $mainMenuItems.length,
        
    // Variable qui récupère l'index de l'élément de la liste sélectionné, initialisée à -1
        openedIndex = 2,
        
    // Fonction permettant de vérifier si l'index est valide
        validIndex = function (indexToCheck) {
            
            return (indexToCheck >= 0) || (indexToCheck < totalMainMenuItems);
        },
        
    // Fonction d'animation permettant d'ouvrir ou de fermer un élement
        animateItem = function ($item, toOpen, speed) {

            // Variable qui récupère l'image en couleur de l'élément de la liste de l'image sélectionnée
            var $colorImage = $item.find(".color"),
            // Variable qui récupère la largeur du li
                itemParam = toOpen ? {width : "420px"} : {width : "140px"},
            // Variable qui récupère le décalage de l'image en couleur
                colorImageParam = toOpen ? {left: "0px"} : {left: "140px"},
            // Variable qui récupère le titre des films
                $moviesTitle = $item.find("p");
            // Animation : fait apparaitre l'image en couleur correspondante
            $colorImage.animate(colorImageParam, speed);
            // Animation : fait apparaitre la description correspondante
            $item.animate(itemParam, speed);
            // Animation : fait apparaitre le titre des films en cascade       
            $moviesTitle.hide();
            $moviesTitle.eq(0).fadeIn(1000, function () {
                $moviesTitle.eq(1).fadeIn(500, function () {
                    $moviesTitle.eq(2).fadeIn(500);
                });
            });
        },
        
    // Fonction permettant de lancer la vérification et l'animation d'un élément    
        checkAndAnimateItem = function (indextoCheckAndAnimate) {
            // Si l'élément choisi est l'élément ouvert...
            if (openedIndex === indextoCheckAndAnimate) {

                // Fermer l'élement
                animateItem($mainMenuItems.eq(indextoCheckAndAnimate), false, 250);
                // Réinitialiser le valeur de l'index à -1
                openedIndex = -1;

            // Sinon...    
            } else {

                // Si l'élement choisi a un index valide...
                if (validIndex(indextoCheckAndAnimate)) {

                    // Lancer la fonction d'animation pour fermer l'élément ouvert
                    animateItem($mainMenuItems.eq(openedIndex), false, 250);

                    // Lancer la fonction d'animation pour ouvrir l'élément sélectionné
                    animateItem($mainMenuItems.eq(indextoCheckAndAnimate), true, 250);

                    // Donner la valeur de l'index sélectionné à la valeur de l'index ouvert
                    openedIndex = indextoCheckAndAnimate;

                }
            }
        },
        
    // Fonction attachée à des événements
        bindEvents = function () {
            
            // Fonction qui se lance lors du clic sur une image
            $mainMenuItems.children(".images").click(function () {
                
                // Variable qui récupère l'index de l'élément de la liste de l'image sélectionnée
                var newIndex = $(this).parent().index(),
                    
                // Variable qui récupère l'élément de la liste de l'image sélectionnée
                    $item = $mainMenuItems.eq(newIndex);
                    
                // Lancer la vérification et l'animation d'un élément
                checkAndAnimateItem(newIndex);

            });
            
            // Fonction qui s'execute lors de l'entrée et de la sortie du boutton
            $(".button").hover(
                
                // Lors de l'entrée sur le boutton : ajout de la classe hovered
                function () {
                    $(this).addClass("hovered");
                },
                
                // Lors de la sortie du boutton : suppression de la classe hovered
                function () {
                    $(this).removeClass("hovered");
                }
            );
            
            // Fonction qui s'execute lors du clic sur le bouton
            $(".button").click(function () {
                
                // Variable qui récupère l'index de l'élément de la liste du bouton sélectionné
                var newIndex = $(this).index(),
                
                // Variable qui récupère l'élément de la liste de l'image sélectionnée
                    $item = $mainMenuItems.eq(newIndex);
                    
                // Lancer la vérification et l'animation de l'élément choisi
                checkAndAnimateItem(newIndex);
                
            });
        },
        
    // Fonction d'initialisation    
        init = function () {
                      
            if (validIndex(openedIndex)) {
                
                animateItem($mainMenuItems.eq(openedIndex), true, 700);
            }
            
            bindEvents();

        };
    
    init();
    
});