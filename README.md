# 🎓 MémoireGenius

**L'assistant intelligent pour la formalisation de vos projets académiques.**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-stable-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## 📖 À propos

**MémoireGenius** est une application web moderne conçue pour accompagner les étudiants (notamment en année de licence ou master) dans la structuration de leur projet de mémoire. 

Elle permet de saisir les informations essentielles d'un projet de recherche et de générer automatiquement un document **Word (.docx)** parfaitement formaté, prêt à être soumis à un directeur de recherche ou à l'administration.

L'application intègre l'intelligence artificielle **Google Gemini** pour aider les étudiants à formuler ou améliorer leurs sujets et objectifs de recherche.

## 🎯 Pour qui ?

Ce projet est destiné :
- Aux **étudiants** en fin de cycle universitaire (Licence 3, Master).
- Aux **professeurs de méthodologie** souhaitant standardiser les fiches de projet.
- Aux établissements d'enseignement supérieur.

## ✨ Fonctionnalités Clés

### 1. Parcours Étudiant Intuitif
- **Identification** : Collecte propre des données personnelles (Nom, Prénom, Filière, Contact).
- **Validation en temps réel** : Vérification des formats d'emails et de téléphones.
- **Interface fluide** : Navigation étape par étape avec indicateurs de progression.

### 2. Assistance IA (Powered by Gemini)
- **Génération d'idées** : Si l'étudiant a un sujet vague, l'IA propose un objectif général et 3 objectifs spécifiques académiques.
- **Mode "Amélioration"** : Si l'étudiant a déjà rédigé ses textes, l'IA agit comme un correcteur académique pour reformuler, corriger le ton et préciser le vocabulaire sans changer le sens (Reformulation niveau expert).

### 3. Génération de Document
- **Export Word (.docx)** instantané côté client.
- **Mise en page stricte** : Tableau structuré verticalement pour une meilleure lisibilité.
- **Typographie respectée** : Utilisation de *Montserrat* (Titres) et *Roboto* (Corps, taille 14pt).
- **Contenu** : "Fiche de renseignements sujet de mémoire - Cours Méthodologie de Recherche".

## 🛠️ Stack Technologique

Ce projet utilise une stack moderne, performante et typée.

### Frontend
- **[React 19](https://react.dev/)** : Bibliothèque d'interface utilisateur.
- **[TypeScript](https://www.typescriptlang.org/)** : Typage statique pour un code robuste.
- **[Vite](https://vitejs.dev/)** : Build tool ultra-rapide.
- **[Tailwind CSS](https://tailwindcss.com/)** : Framework CSS utilitaire pour le design responsive.

### Services & Logique
- **[Google GenAI SDK](https://www.npmjs.com/package/@google/genai)** : Interaction avec le modèle `gemini-2.5-flash` pour l'intelligence artificielle.
- **[docx](https://docx.js.org/)** : Génération programmatique de fichiers Word complexes.
- **[FileSaver.js](https://github.com/eligrey/FileSaver.js)** : Gestion du téléchargement côté navigateur.

### Design & UX
- **Lucide React** : Bibliothèque d'icônes vectorielles.
- **Google Fonts** : Montserrat (Extra Bold) & Roboto.

## 🚀 Installation et Démarrage

Pour lancer le projet localement, suivez ces étapes :

### Prérequis
- Node.js (version 18+ recommandée)
- Une clé API Google Gemini (disponible sur [Google AI Studio](https://aistudio.google.com/))

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/memoire-genius.git
cd memoire-genius
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration des variables d'environnement
La clé API est injectée via le processus de build ou l'environnement d'exécution.
*(Note : Dans l'environnement actuel, la clé est fournie via `process.env.API_KEY`)*.

Pour un usage local classique avec Vite, créez un fichier `.env` à la racine :
```env
VITE_API_KEY=votre_cle_api_ici
```
*(Il faudra adapter le code pour utiliser `import.meta.env.VITE_API_KEY` si vous sortez de l'environnement WebContainer actuel)*.

### 4. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5173`.

## 📦 Déploiement

Le projet est configuré pour être déployé facilement sur **Vercel**, **Netlify** ou tout hébergeur de sites statiques.

1. Connectez votre dépôt GitHub à Vercel.
2. Ajoutez la variable d'environnement `API_KEY` dans les paramètres du projet Vercel.
3. Vercel détectera automatiquement `vite` et déploiera l'application.

## 🎨 Structure du Projet

```
/
├── components/        # Composants React réutilisables
│   ├── ProjectForm.tsx    # Formulaire projet + IA
│   ├── StudentForm.tsx    # Formulaire identité
│   ├── ReviewStep.tsx     # Écran de validation
│   └── StepIndicator.tsx  # Barre de progression
├── services/          # Logique métier
│   ├── geminiService.ts   # Appels API Google AI
│   └── docxService.ts     # Génération du fichier Word
├── public/            # Assets statiques (icônes)
├── App.tsx            # Composant racine
├── index.html         # Point d'entrée HTML
├── types.ts           # Définitions TypeScript
└── ...config files
```

## 📄 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

---
*Développé avec ❤️ pour l'excellence académique.*