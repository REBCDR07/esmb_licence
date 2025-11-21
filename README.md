# 🎓 MémoireGenius

**L'assistant pour la formalisation de vos projets académiques.**

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![Status](https://img.shields.io/badge/status-stable-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## 📖 À propos

**MémoireGenius** est une application web moderne conçue pour accompagner les étudiants (notamment en année de licence ou master) dans la structuration de leur projet de mémoire. 

Elle permet de saisir les informations essentielles d'un projet de recherche et de générer automatiquement un document **Word (.docx)** parfaitement formaté, prêt à être soumis à un directeur de recherche ou à l'administration.

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

### 2. Saisie Structurée
- **Sujet et Objectifs** : Champs dédiés pour le sujet, l'objectif général et les 3 objectifs spécifiques.

### 3. Génération de Document Optimisée
- **Export Word (.docx)** instantané côté client.
- **Format A4 Unique** : Le document est conçu pour tenir sur une seule page avec des marges optimisées.
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

### Services
- **[docx](https://docx.js.org/)** : Génération programmatique de fichiers Word complexes.
- **[FileSaver.js](https://github.com/eligrey/FileSaver.js)** : Gestion du téléchargement côté navigateur.

## 🚀 Installation et Démarrage

Pour lancer le projet localement, suivez ces étapes :

### Prérequis
- Node.js (version 18+ recommandée)

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/memoire-genius.git
cd memoire-genius
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5173`.

## 📦 Déploiement sur Vercel

Le projet est configuré pour être déployé facilement.
1. Connectez votre dépôt GitHub à Vercel.
2. Vercel détectera automatiquement `vite` et déploiera l'application.

## 🎨 Structure du Projet

```
/
├── components/        # Composants React réutilisables
│   ├── ProjectForm.tsx    # Formulaire projet
│   ├── StudentForm.tsx    # Formulaire identité
│   ├── ReviewStep.tsx     # Écran de validation
│   └── StepIndicator.tsx  # Barre de progression
├── services/          # Logique métier
│   └── docxService.ts     # Génération du fichier Word
├── public/            # Assets statiques (icônes)
├── App.tsx            # Composant racine
├── index.html         # Point d'entrée HTML
├── types.ts           # Définitions TypeScript
└── ...config files
```

## 📄 Licence

Distribué sous la licence MIT.

---
*Développé avec ❤️ pour l'excellence académique.*