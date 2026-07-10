# Composable Clinical Intelligence
### A FHIR-Based Marketplace for Predictive Micro-Frontend Widgets Integrable into Existing EHR Systems

## Demo Video

If you want to get up to speed with this repo, watch [this](https://drive.google.com/file/d/1yCRVooStOor_50FE0D17XgLd4UwluX2b/view?usp=drive_link) demo video.

## Quick Start Guide

If you want to quickly get the project up and running, here are the steps to follow:
1. Switch branch to "smart-auth-microfrontend-demo" and follow the README there.
2. Switch branch to "ai-models-backend" and follow the README there.
3. Switch branch to "widgets-backend" and follow the README there.

## 📌 Overview

This project presents an interoperability-centered architecture designed to extend Clinical Decision Support Systems (CDSS) through composable, FHIR-compatible micro-frontend widgets.

Rather than focusing solely on predictive modeling, the core contribution of this work lies in enabling seamless, vendor-agnostic integration of clinical intelligence into existing Electronic Health Record (EHR) systems.

The proposed solution takes the form of a **FHIR-native widget marketplace**, where lightweight, browser-embedded components can be integrated into any web-based CDSS with minimal friction.

---

## 🎯 Core Contribution

Modern healthcare infrastructures often struggle to integrate predictive models into EHR systems due to:

- Vendor lock-in
- Proprietary architectures
- High deployment complexity
- Tight coupling between decision logic and EHR systems

This work addresses these limitations by introducing:

- ✅ A composable micro-frontend architecture
- ✅ Standards-based FHIR data retrieval
- ✅ SMART-on-FHIR interoperability
- ✅ OAuth2-secured patient-scoped access
- ✅ Decoupled predictive intelligence
- ✅ Version-controlled, health-checked deployment
- ✅ Scalable orchestration layer

The result is a **plug-and-play clinical intelligence delivery model**.

---

## 🏗 Architecture

The system consists of:

1. **Frontend Marketplace**
    - React-based UI
    - Allows browsing and configuring available widgets
    - Customizable FHIR base URL and display settings

2. **Micro-Frontend Widgets**
    - Embedded via simple HTML snippet
    - Self-contained and browser-native
    - Retrieve patient data via FHIR R4 endpoints
    - Communicate with backend for inference

3. **Backend (Django + DRF)**
    - Provides versioning and health-check system
    - Manages widget lifecycle
    - Exposes REST APIs for inference routing

4. **Orchestration Layer**
    - Load-balanced model services
    - Scalable container-based deployment
    - High availability and horizontal scaling

---

## 🔗 Interoperability Validation

The solution demonstrates full SMART-on-FHIR interoperability by:

- Launching inside a standards-compliant SMART sandbox
- Retrieving patient-scoped FHIR R4 data
- Performing OAuth2-secured requests
- Executing model inference without EHR-specific coupling

This confirms that predictive components can operate independently of monolithic EHR systems while maintaining standards compliance.

---

## 🧠 Proof-of-Concept Widgets

To validate the architectural paradigm, a minimal set of predictive widgets was implemented, including:

- **Heart Attack Risk Predictor**

The implemented models achieved:
- AUC: 0.78
- F1-score: 0.70

These results serve as feasibility validation of the deployment model rather than the primary scientific contribution.

---

## 🚀 Key Innovation

This project shifts the focus from **model-centric CDSS development** toward **infrastructure-centric clinical intelligence delivery**.

It demonstrates that predictive decision support can be:

- Modular
- Reusable
- Interoperable
- Vendor-agnostic
- Scalable
- Decoupled from proprietary EHR systems

---

## 🔮 Future Directions

- Expansion of the widget ecosystem
- Third-party developer onboarding under strict validation rules
- Alert fatigue mitigation mechanisms
- Governance and security framework for marketplace scaling
- Validation across multiple real-world EHR deployments

---
