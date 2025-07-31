# CentralResume

A modern, open-source resume builder and management platform.

## Project Structure

This is a monorepo project managed with pnpm workspaces containing:

- `apps/main-app`: Next.js frontend application
- `apps/api-backend`: Backend API server
- `packages/database`: Shared database schemas and migrations
- `packages/resume-core`: Core resume functionality and types

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/anisharaz/centralresume.git
   cd centralresume
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   - Copy the example env files for each application:

     ```bash
     cp apps/main-app/.env.example apps/main-app/.env
     cp apps/api-backend/.env.example apps/api-backend/.env
     cp packages/database/.env.example packages/database/.env
     ```

   - Update the environment variables with your configurations

4. Database Setup:

   - In a separate terminal, start the PostgreSQL database using Prisma dev:

   ```bash
   cd packages/database
   pnpm prisma dlx prisma dev
   ```

   - Migrate the database schema:

     ```bash
        cd packages/database
        pnpm dlx prisma db push
     ```

5. Start the development servers:

   ```bash
   # Start all applications in development mode
   pnpm dev
   ```

The applications will be available at:

- Main App: [http://localhost:3000](http://localhost:3000)
- API Backend: [http://localhost:4000](http://localhost:4000)

## Development

### Project Commands

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications and packages
- `pnpm lint`: Run linting across all projects
- `pnpm test`: Run tests across all projects

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
