# NephroEx Frontend

This repository contains the frontend code for NephroEx, a CAD tool for interpreting diuretic renography in urinary tract obstruction (UTO) and Explainable AI analysis.

🔗 **Live Demo**: [https://nephroviz-app-gfcndyesfnbwfzgh.westeurope-01.azurewebsites.net/sign-in](https://nephroviz-app-gfcndyesfnbwfzgh.westeurope-01.azurewebsites.net/sign-in)

## Related Repositories

- [NephroEx Backend](https://github.com/AI-Diagnostic-Assistant/NephroEx-Server)
- [NephroEx ML Environment](https://github.com/AI-Diagnostic-Assistant/ML-Environment)

## Features

- Interactive UTO diagnosis visualization dashboard
- Explainable AI results for patient data
- Authentication with Supabase
- Responsive design with Tailwind CSS and Shadcn
- Built with Next.js App Router

## Technologies

- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com) for db and authentication
- [Tailwind CSS](https://tailwindcss.com) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components

## Prerequisites

Before running this project, make sure you have:

- Node.js 20.x or later
- npm or yarn

## ⚠️ Important

You **must** set up the following environment variables to run the application:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=your_backend_api_url
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/AI-Diagnostic-Assistant/NephroEx-App.git
cd NephroEx-App
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with the required environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=your_backend_api_url
```

4. Run the development server:

```bash
npm run dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Deployment

The application is currently deployed to Azure Web App. Deployments are handled through GitHub Actions defined in `.github/workflows/main_nephroviz-app.yml`.

## License

This project is proprietary and is not available for public use, reproduction, or distribution. This repository is maintained solely for demonstration and portfolio purposes as part of a master's thesis project at NTNU. All rights reserved © 2025.

## Contact

### Magnus Rosvold Farstad

NTNU - Norwegian University of Science and Technology  
Email: magnus.r.farstad@gmail.com  
LinkedIn: [Magnus Rosvold Farstad](https://www.linkedin.com/in/magnusrosvoldfarstad/)  
GitHub: [@magnus-farstad](https://github.com/Magnus-Farstad)

### Simen Klemp Wergeland

NTNU - Norwegian University of Science and Technology  
Email: simenk2312@gmail.com  
LinkedIn: [Simen Klemp Wergeland](https://www.linkedin.com/in/simen-klemp-wergeland-b684411ba/)  
GitHub: [@SimenKlemp](https://github.com/SimenKlemp)
