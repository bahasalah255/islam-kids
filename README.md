# 🌙 Ramadan Kids Corner

Un site web éducatif conçu pour les enfants (6-12 ans) afin de découvrir et célébrer le Ramadan de manière ludique et interactive.

## 📋 Vue d'Ensemble

**Ramadan Kids Corner** est un site web responsive de 5 pages, développé avec Bootstrap 5, qui offre une expérience utilisateur optimale pour les enfants. Le site propose des activités créatives, des histoires inspirantes, des quiz interactifs et un espace de contact.

## ✨ Fonctionnalités

### Pages Principales

1. **Accueil (index.html)**
   - Hero section avec dégradé violet/nuit
   - 4 cartes d'activités principales avec icônes géantes
   - Section "Pourquoi c'est super ici ?" avec 4 avantages
   - Call-to-action engagent
   - Footer en 3 colonnes

2. **Activités (activites.html)**
   - Grille responsive de cartes d'activités
   - Badges colorés pour filtrage visuel (Vert: Recettes, Orange: Coloriage, Violet: Bricolage)
   - Modals Bootstrap pour les recettes détaillées
   - Sections: Coloriage, Recettes, Bricolage

3. **Histoires (histoires.html)**
   - Accordéon Bootstrap pour les histoires
   - 5 histoires complètes avec morales
   - Section "Le Savais-Tu ?" avec faits intéressants
   - Section interactive "Écris Ta Propre Histoire"

4. **Quiz (quiz.html)** 🎮
   - Système de quiz interactif avec JSON
   - 3 quiz thématiques (Ramadan, Histoires, Culture Générale)
   - Système de points et progression
   - Révision des réponses avec explications
   - Animations et feedback visuel
   - Scores et statistiques détaillées

5. **Contact (contact.html)**
   - Formulaire épuré avec validation HTML5 en temps réel
   - Validation `is-valid/is-invalid` en temps réel
   - Carte interactive Google Maps (iframe)
   - FAQ avec accordéon
   - Informations de contact complètes

## 🎨 Directives UI/UX

### Identité Visuelle

**Palette de Couleurs:**
- 🟡 Or: `#F9C74F`
- 🟠 Orange: `#F9844A`
- 🟢 Vert: `#43AA8B`
- 🟣 Violet: `#7B5EA7`

**Typographie:**
- **Titres:** 'Fredoka' (Google Fonts) - Look arrondi et amical
- **Corps de texte:** 'Quicksand' - Haute lisibilité

**Design:**
- Border-radius: 20px sur tous les éléments
- Ombres légères au survol (box-shadow)
- Transitions CSS douces (0.3s ease)
- Bootstrap Icons & Emojis pour repères visuels

### Expérience Utilisateur

**Navigation:**
- Navbar sticky-top
- Logo textuel lisible
- Bouton CTA coloré "Commencer"
- Navigation active indiquée

**Accessibilité:**
- Contraste élevé texte/fond
- Boutons grande taille (min-height: 48px)
- Touch-friendly pour tablettes
- Validation de formulaire en temps réel

**Micro-interactions:**
- Transitions CSS sur boutons et liens
- Animation au scroll pour les cartes
- Bouton "Retour en haut" (apparaît après 300px de scroll)

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Variables CSS, Flexbox, Grid
- **Bootstrap 5.3.2** - Framework responsive
- **Bootstrap Icons 1.11.1** - Icônes
- **Google Fonts** - Fredoka & Quicksand
- **JavaScript (Vanilla)** - Interactivité

## 📁 Structure du Projet

```
islam-kids/
│
├── index.html              # Page d'accueil
├── activites.html          # Page des activités
├── histoires.html          # Page des histoires
├── quiz.html               # Page des quiz interactifs 🎮
├── contact.html            # Page de contact
│
├── assets/
│   ├── css/
│   │   ├── style.css       # CSS personnalisé principal
│   │   └── quiz.css        # CSS spécifique aux quiz
│   │
│   ├── js/
│   │   ├── main.js         # JavaScript principal
│   │   └── quiz.js         # Système de quiz (QuizManager)
│   │
│   └── data/               # Données JSON des quiz
│       ├── quiz-ramadan.json     # 10 questions sur le Ramadan
│       ├── quiz-histoire.json    # 8 questions sur les histoires
│       └── quiz-culture.json     # 6 questions culture générale
│
└── README.md              # Documentation
```

## 🚀 Installation et Utilisation

### Lancement Local

1. **Cloner le projet:**
   ```bash
   git clone <repository-url>
   cd islam-kids
   ```

2. **Ouvrir le site:**
   - Option 1: Double-cliquer sur `index.html`
   - Option 2: Utiliser un serveur local:
     ```bash
     # Avec Python 3
     python -m http.server 8000
     
     # Avec Node.js
     npx serve
     ```

3. **Accéder au site:**
   - Ouvrir http://localhost:8000 dans le navigateur

Aucune installation de dépendances n'est nécessaire ! Tous les frameworks sont chargés via CDN.

## 🎯 Fonctionnalités JavaScript

### Bouton Retour en Haut
- Apparaît après 300px de scroll
- Animation smooth scroll
- Style flottant avec ombre

### Validation de Formulaire
- Validation en temps réel (blur & input)
- Vérification email (regex)
- Messages d'erreur contextuels
- Message de succès animé

### Navigation Active
- Détection automatique de la page courante
- Mise en surbrillance du lien actif

### Animations au Scroll
- Apparition progressive des cartes
- Utilisation de l'Intersection Observer API
- Effet fade-in + translateY

### Système de Quiz Interactif 🎮
- **Architecture orientée objet (QuizManager class)**
- **Chargement dynamique depuis JSON**
  - `quiz-ramadan.json` : 10 questions sur le Ramadan
  - `quiz-histoire.json` : 8 questions sur les histoires
  - `quiz-culture.json` : 6 questions culture générale
- **Fonctionnalités:**
  - Sélection de réponses avec feedback visuel
  - Navigation entre questions (suivant/précédent)
  - Barre de progression animée
  - Calcul automatique des scores
  - Affichage des résultats avec graphique circulaire SVG
  - Révision complète avec explications
  - Option de recommencer
  - Messages d'encouragement adaptés au score
- **UX:**
  - Animations fluides (slide-in, pulse, celebrate)
  - Loading overlay pendant le chargement
  - Responsive design pour mobile/tablette
  - Icônes et badges colorés
  - Feedback immédiat sur les choix

## 📱 Responsive Design

Le site est entièrement responsive avec 3 breakpoints principaux:

- **Mobile** (< 576px): 1 colonne, icônes réduites
- **Tablette** (576px - 992px): 2 colonnes
- **Desktop** (> 992px): 3 colonnes, pleine largeur

## ✅ Critères UI/UX Respectés

- ✅ Palette de couleurs avec variables CSS
- ✅ Typographies Google Fonts (Fredoka + Quicksand)
- ✅ Border-radius 20px partout
- ✅ Emojis et icônes pour repères visuels
- ✅ Box-shadow au survol
- ✅ Navbar sticky-top
- ✅ Boutons min-height 48px
- ✅ Transitions 0.3s ease
- ✅ Zéro Lorem Ipsum
- ✅ Hero section 

### Quiz 🎮
- 3 quiz thématiques avec 24 questions au total
- Système de scoring et progression
- Révision avec explications pédagogiques
- Interface ludique et encourageanteavec dégradé
- ✅ Accordéon Bootstrap pour histoires
- ✅ Validation HTML5 en temps réel
- ✅ Bouton retour en haut (scroll > 300px)
7. **Quiz Gamifiés:** Système de quiz avec JSON, scores et feedback 🎮
- ✅ Carte Google Maps interactive

## 🎓 Public Cible

Enfants de **6 à 12 ans** avec design adapté:
- Couleurs vives et engageantes
- Typographies arrondies et amicales
- Icônes et emojis pour faciliter la compréhension
- Langage simple et direct
- Grands boutons tactiles

## 📝 Contenu Éducatif

### Activités
- 🎨 Coloriage et dessins
- 🍪 Recettes faciles en famille
- ✂️ Bricolages créatifs

### Histoires
- 5 histoires complètes avec morales
- Messages positifs et valeurs
- Format accordéon pour lisibilité

### Contact
- Formulaire accessible
- FAQ détaillée
- Réseaux sociaux

## 🌟 Points Forts

1. **Design Kid-Friendly:** Interface colorée et intuitive
2. **Performance:** Chargement rapide via CDN
3. **Accessibilité:** Contraste élevé, grands boutons
4. **Responsive:** Fonctionne sur tous les appareils
5. **Interactif:** Animations et validations dynamiques
6. **Éducatif:** Contenu riche et engageant

## 📄 Licence

© 2026 Ramadan Kids Corner. Tous droits réservés.
Fait avec ❤️ pour nos enfants.

## 👥 Contact

- **Email:** contact@ramadankids.com
- **Téléphone:** +33 1 23 45 67 89
- **Adresse:** 123 Rue du Ramadan, 75001 Paris, France

---

**Bon Ramadan à tous les enfants ! 🌙✨**-