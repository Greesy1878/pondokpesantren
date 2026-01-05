# API Contracts - Ma'had Tahfidz Tunas Qur'an Website

## Frontend Mock Data Location
File: `/app/frontend/src/mockData.js`

## Backend Integration Requirements

### 1. PMB (Penerimaan Mahasantri Baru) Registration System

#### Endpoint: `POST /api/pmb/register`

**Request Body:**
```json
{
  "fullName": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (required)",
  "address": "string (required)",
  "jalur": "string (required, enum: ['Full Beasiswa', 'Semi Beasiswa', 'Reguler'])",
  "kelas": "string (required, enum: ['Program Unggulan – Tahfidz + Ekstensi IAIPI', 'Program Utama – Tahfidz Intensif'])",
  "birthDate": "string (required, ISO date)",
  "parentName": "string (required)",
  "parentPhone": "string (required)",
  "notes": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pendaftaran berhasil! Kami akan menghubungi Anda segera.",
  "data": {
    "registrationId": "string",
    "fullName": "string",
    "jalur": "string",
    "kelas": "string"
  }
}
```

**Database Model:**
- Collection: `pmb_registrations`
- Fields:
  - `_id`: ObjectId (auto-generated)
  - `fullName`: String
  - `email`: String
  - `phone`: String
  - `address`: String
  - `jalur`: String
  - `kelas`: String
  - `birthDate`: Date
  - `parentName`: String
  - `parentPhone`: String
  - `notes`: String (optional)
  - `status`: String (default: "pending", enum: ["pending", "reviewed", "accepted", "rejected"])
  - `createdAt`: Date (auto)
  - `updatedAt`: Date (auto)

**Email Notification:**
- Send email to admin: `admin@tunasquran.edu` (or configured email)
- Email template: Include all registration details
- Email subject: "Pendaftaran Santri Baru - [Full Name]"

---

### 2. Contact Form (Optional Future Enhancement)

#### Endpoint: `POST /api/contact`

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "subject": "string (required)",
  "message": "string (required)"
}
```

---

## Frontend Integration Steps

1. **Create PMB Registration Form Component**
   - Location: `/app/frontend/src/components/PMBForm.jsx`
   - Use React Hook Form for form validation
   - Use shadcn/ui components (Form, Input, Select, Button, etc.)
   - Toast notification for success/error feedback

2. **Update Home.jsx**
   - Import PMBForm component
   - Replace "Daftar Sekarang" button click to open dialog/modal with form
   - Or navigate to PMB section and show inline form

3. **Remove Mock Data**
   - After backend integration, PMB form will submit directly to API
   - No mock data needed for PMB registration

---

## Email Configuration

**Environment Variables Required:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@tunasquran.edu
```

**Note:** Use Gmail App Password for SMTP authentication

---

## Testing Checklist

- [ ] Form validation works (all required fields)
- [ ] Email format validation
- [ ] Phone number validation
- [ ] Date picker for birth date
- [ ] Submit button disabled during submission
- [ ] Success toast after successful registration
- [ ] Error handling for failed submissions
- [ ] Email notification sent to admin
- [ ] Data saved correctly in MongoDB
- [ ] Responsive design on mobile

---

## Notes

- Frontend currently uses mock data for all content sections
- Backend only needed for PMB registration form at this stage
- ZISWAF donation section shows bank account info only (no payment gateway integration)
- Gallery, Inspirasi, and other sections are static content from mock data
