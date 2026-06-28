This branch shows how to configure the HAPI FHIR server.

## Quick Start Guide

1. Clone the official HAPI FHIR JPA Server:
   ```bash
   git clone https://github.com/hapifhir/hapi-fhir-jpaserver-starter.git
   cd hapi-fhir-jpaserver-starter
   
FHIR base URL:

http://localhost:8080/fhir

Verify the server is running:

http://localhost:8080/fhir/metadata


2. Force the usage of PostgreSQL instead of H2 by editing the `docker-compose.yml` file:
    ```yaml
    services:
      hapi-fhir-jpaserver-start:
        build: .
        container_name: hapi-fhir-jpaserver-start
        restart: on-failure
        environment:
          SPRING_DATASOURCE_URL: "jdbc:postgresql://hapi-fhir-postgres:5432/hapi"
          SPRING_DATASOURCE_USERNAME: "admin"
          SPRING_DATASOURCE_PASSWORD: "admin"
          SPRING_DATASOURCE_DRIVER_CLASS_NAME: "org.postgresql.Driver"
          # Explicitly override the Hibernate dialect via native Spring Boot property
          SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT: "ca.uhn.fhir.jpa.model.dialect.HapiFhirPostgresDialect"
        ports:
          - "8080:8080"
        depends_on:
          hapi-fhir-postgres:
            condition: service_healthy
    
      hapi-fhir-postgres:
        image: postgres:16-alpine
        container_name: hapi-fhir-postgres
        restart: always
        environment:
          POSTGRES_DB: "hapi"
          POSTGRES_USER: "admin"
          POSTGRES_PASSWORD: "admin"
        healthcheck:
          test: ["CMD-SHELL", "sh -c 'pg_isready -U admin -d hapi' || exit 1"]
          interval: 10s
          timeout: 5s
          start_period: 5s
          retries: 5
        volumes:
          - hapi-fhir-postgres:/var/lib/postgresql/data
    
    volumes:
      hapi-fhir-postgres:
   
3. Start the server using Docker Compose:
   ```bash
    docker-compose up
4. Add hard-coded data (regarding a patient) for development and testing purposes:
    ```
   POST (http://localhost:8080/fhir)
   {
      "resourceType": "Bundle",
      "type": "transaction",
      "entry": [
        {
          "fullUrl": "http://localhost:8080/fhir/Patient/pat-1000",
          "resource": {
            "resourceType": "Patient",
            "id": "pat-1000",
            "active": true,
            "name": [
              {
                "use": "official",
                "family": "Doe",
                "given": [
                  "John"
                ]
              }
            ],
            "gender": "male",
            "birthDate": "1971-06-28"
          },
          "request": {
            "method": "PUT",
            "url": "Patient/pat-1000"
          }
        }
      ]
    }
5. Add hard-coded observation for the previously added patient:
    ```
   POST (http://localhost:8080/fhir)
    {
      "resourceType": "Bundle",
      "type": "transaction",
      "entry": [
        {
          "fullUrl": "http://localhost:8080/fhir/Patient/pat-1000",
          "resource": {
            "resourceType": "Patient",
            "id": "pat-1000",
            "active": true,
            "name": [
              {
                "use": "official",
                "family": "Doe",
                "given": [
                  "John"
                ]
              }
            ]
          },
          "request": {
            "method": "PUT",
            "url": "Patient/pat-1000"
          }
        },
        {
          "fullUrl": "urn:uuid:cholesterol-001",
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "2093-3",
                  "display": "Total Cholesterol"
                }
              ],
              "text": "chol"
            },
            "subject": {
              "reference": "Patient/pat-1000"
            },
            "valueQuantity": {
              "value": 233,
              "unit": "mg/dL",
              "system": "http://unitsofmeasure.org",
              "code": "mg/dL"
            }
          },
          "request": {
            "method": "POST",
            "url": "Observation"
          }
        },
        {
          "fullUrl": "urn:uuid:bloodpressure-001",
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "vital-signs",
                    "display": "Vital Signs"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "8480-6",
                  "display": "Systolic blood pressure"
                }
              ],
              "text": "tresbps"
            },
            "subject": {
              "reference": "Patient/pat-1000"
            },
            "valueQuantity": {
              "value": 130,
              "unit": "mm[Hg]",
              "system": "http://unitsofmeasure.org",
              "code": "mm[Hg]"
            }
          },
          "request": {
            "method": "POST",
            "url": "Observation"
          }
        }
      ]
    }
6. Verify that the data got added successfully by performing a GET request to retrieve the patient and their observations:
   ```
   GET (http://localhost:8080/fhir/Observation?subject=Patient/pat-1000)
   ```