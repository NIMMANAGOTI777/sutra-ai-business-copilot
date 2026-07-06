# Setup Instructions: Supabase Production Auth, Database Sync & Onboarding

Follow these steps to configure **Supabase Authentication**, **Google OAuth**, **Twilio Phone Auth**, and the **User Profiles & Workspaces** database tables in your environment.

---

## 1. Environment Setup

1. Copy the `.env.example` file in the root directory to a new file named `.env`:
   ```bash
   cp .env.example .env
   ```
2. Retrieve your project URL and Anon Public Key from your **Supabase Dashboard** under **Project Settings > API**.
3. Fill in the values in your `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## 2. Supabase SQL Database Setup

To automatically sync user records and configure workspaces, run our setup script:

1. Open your **Supabase Dashboard**.
2. Navigate to **SQL Editor** on the left menu.
3. Click **New Query**.
4. Copy and paste the contents of [supabase_setup.sql](file:///c:/Users/ADMIN/OneDrive/goal/Desktop/Sutra/supabase_setup.sql) into the editor.
5. Click **Run**.

This query provisions:
- **`profiles` Table:** Stores user identifiers, name, emails, and phone verification details.
- **`workspaces` Table:** Stores business registration details, connected channels, and AI Knowledge Base configurations.
- **RLS Policies:** Blocks unauthorized traffic, permitting owners to read/update only their own rows where `auth.uid() = owner_id` or `auth.uid() = id`.
- **PostgreSQL Triggers:** Maps signup and login events directly to `profiles` sync triggers.

---

## 3. Configure Google OAuth

To enable Google Sign-In:

1. Go to the **Google Cloud Console** (https://console.cloud.google.com/).
2. Create or select a project.
3. Navigate to **APIs & Services > Credentials**.
4. Configure the **OAuth Consent Screen** (external category) and fill in application details.
5. Click **Create Credentials > OAuth Client ID**.
   - **Application Type:** Web Application
   - **Authorized JavaScript Origins:** Add your local host (e.g. `http://localhost:5173`) and production domain.
   - **Authorized Redirect URIs:** Fetch the callback URI from **Supabase Dashboard > Auth > Providers > Google** (usually in the format `https://your-project-id.supabase.co/auth/v1/callback`) and paste it here.
6. Copy the generated **Client ID** and **Client Secret**.
7. In **Supabase Dashboard**, go to **Auth > Providers > Google**:
   - Toggle **Enable Google Provider** to **ON**.
   - Input your Google **Client ID** and **Client Secret**.
   - Click **Save**.

---

## 4. Configure Mobile Phone SMS OTP

To enable real SMS OTP delivery:

1. Go to your **Supabase Dashboard > Auth > Providers > Phone**:
   - Toggle **Enable Phone Provider** to **ON**.
   - Choose your SMS provider (default is **Twilio**, but Supabase also supports MessageBird, Vonage, SMS77, etc.).
2. If using **Twilio**:
   - Obtain your **Account SID**, **Auth Token**, and **Messaging Service SID** (or phone number) from your Twilio Console (https://www.twilio.com/console).
   - Enter these credentials into the Supabase Phone configuration fields.
3. Toggle **SMS OTP** configurations:
   - Ensure "Enable SMS Confirmation" is set to true.
   - Adjust the OTP expiration (default 3600 seconds) if needed.
4. Click **Save**.
5. *Note:* Ensure you have SMS credits or are using Twilio sandbox phone numbers if testing in trial mode.
