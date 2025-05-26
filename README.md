# 🔍 Search Intelligence - Documentation

## 📚 Note pédagogique

> **Projet éducatif** : Cette application a été conçue comme support de cours pour l'apprentissage de JavaScript moderne (ES6+), des APIs asynchrones et des bonnes pratiques de développement web. Elle illustre les concepts fondamentaux du développement front-end : manipulation du DOM, gestion d'événements, et requêtes HTTP.

Application de recherche en temps réel dans une collection de posts utilisant l'API DummyJSON.

## 📋 Fonctionnalités

- ✅ Récupération de posts depuis une API REST
- ✅ Recherche en temps réel (titre et contenu)
- ✅ Gestion d'erreurs robuste
- ✅ Protection XSS avec échappement HTML

## 🧩 Architecture du code

### Configuration et DOM
```javascript
const API_URL = 'https://dummyjson.com';
const searchInput = document.querySelector('#searchInput');
const postsContainer = document.querySelector('#postsContainer');
```
Définit l'URL de l'API et récupère les références des éléments DOM nécessaires.

### `fetchAllPosts()`
```javascript
async function fetchAllPosts() { /* ... */ }
```
**Rôle** : Récupère tous les posts depuis l'API DummyJSON  
**Particularités** : 
- Vérifie `response.ok` car `fetch()` ne rejette pas automatiquement les erreurs HTTP 4xx/5xx
- Gestion d'erreur avec message explicite

### `filterPostsBySearchTerm(posts, searchTerm)`
```javascript
function filterPostsBySearchTerm(posts, searchTerm) { /* ... */ }
```
**Rôle** : Filtre les posts selon un terme de recherche  
**Particularités** :
- Normalisation avec `toLowerCase()` et `trim()` pour une recherche insensible à la casse
- Recherche dans le titre ET le contenu avec `includes()`

### `renderPosts(posts)`
```javascript
function renderPosts(posts) { /* ... */ }
```
**Rôle** : Affiche les posts dans le DOM  
**Particularités** :
- Gestion du cas "aucun résultat" avec message utilisateur
- Structure HTML sémantique (`ul` → `li`)
- Utilise `escapeHtml()` pour la sécurité

### `escapeHtml(text)`
```javascript
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```
**Rôle** : Protection contre les injections XSS  
**Particularités** : Utilise `textContent` puis `innerHTML` pour échapper automatiquement les caractères spéciaux HTML

### `initializeApp()`
```javascript
async function initializeApp() { /* ... */ }
```
**Rôle** : Point d'entrée principal de l'application  
**Particularités** :
- Charge les posts initiaux au démarrage
- Configure l'événement de recherche en temps réel avec `input`
- Gestion centralisée des erreurs d'initialisation

## 🌐 Structure HTML

### Body Structure
```html
<header> <!-- Titre principal -->
<main>
  <label + input> <!-- Zone de recherche -->
  <section> <!-- Conteneur des résultats -->
</main>
```

### Accessibilité
- `aria-label` et `aria-live="polite"` pour les lecteurs d'écran
- `label` associé à l'input avec `for`
- Focus states avec `focus:ring`

## ⚡ Rappel : Asynchrone & Fetch en JavaScript

**Asynchrone** : `async/await` permet d'écrire du code asynchrone de façon synchrone, évitant les "callback hell"  
**Fetch API** : Moderne alternative à XMLHttpRequest, mais attention : elle ne rejette QUE les erreurs réseau  
**Browser API** : `document.querySelector()`, `addEventListener()` sont des APIs natives du navigateur  
**Event Loop** : Les opérations async sont gérées par l'event loop, permettant de ne pas bloquer l'interface  
**Promises** : `fetch()` retourne une Promise, d'où l'usage d'`await` pour attendre la résolution
