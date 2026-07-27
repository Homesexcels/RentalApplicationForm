import { useState, type FormEvent, type ChangeEvent } from "react"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqrarlz"

type FormData = {
  fullName: string
  age: string
  email: string
  phone: string
  zipCode: string
  criminalRecords: string
  criminalDetails: string
  hasPets: string
  petsDetails: string
  monthlyIncome: string
  peopleMovingIn: string
  hearAboutUs: string
  tourAvailability: string
  applicationFeeDate: string
  paymentMethods: string[]
}

const INITIAL: FormData = {
  fullName: "",
  age: "",
  email: "",
  phone: "",
  zipCode: "",
  criminalRecords: "No",
  criminalDetails: "",
  hasPets: "No",
  petsDetails: "",
  monthlyIncome: "",
  peopleMovingIn: "",
  hearAboutUs: "",
  tourAvailability: "",
  applicationFeeDate: "",
  paymentMethods: [],
}

const PAYMENT_OPTIONS = ["Cash App", "Chime", "PayPal", "Crypto", "Gift Card"]
const HEAR_OPTIONS = [
  "Google Search",
  "Social Media",
  "Word of Mouth",
  "Flyer / Poster",
  "Housing Authority",
  "Other",
]

export default function App() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const set =
    (field: keyof FormData) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const togglePayment = (method: string) => {
    setForm((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...prev.paymentMethods, method],
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "Full Name": form.fullName,
          Age: form.age,
          "Email Address": form.email,
          "Phone Number": form.phone,
          "Current ZIP Code": form.zipCode,
          "Criminal Records":
            form.criminalRecords === "Yes"
              ? `Yes — ${form.criminalDetails}`
              : "No",
          "Has Pets":
            form.hasPets === "Yes" ? `Yes — ${form.petsDetails}` : "No",
          "Monthly Income": `$${form.monthlyIncome}`,
          "People Moving In": form.peopleMovingIn,
          "How They Heard About Us": form.hearAboutUs,
          "Available for House Tour": form.tourAvailability,
          "Will Pay Application Fee By": form.applicationFeeDate,
          "Online Payment Method(s)": form.paymentMethods.join(", "),
        }),
      })

      if (res.ok) {
        setSuccess(true)
      } else {
        const data = await res.json()
        setError(data?.error || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-surface)" }}>
      {/* Header */}
      <header
        style={{
          background: "var(--color-brand)",
          color: "#fff",
          padding: "0",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 2px 12px rgba(26,58,92,0.18)",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.875rem",
            height: 64,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: "var(--color-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
              <path d="M9 21V12h6v9" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.125rem",
                lineHeight: 1.2,
              }}
            >
              Low Income Housing
            </div>
            <div
              style={{
                fontSize: "0.6875rem",
                opacity: 0.72,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              Rental Application Portal
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #1a3a5c 0%, #2a5580 60%, #1d4a72 100%)",
          color: "#fff",
          padding: "3rem 1.25rem 2.5rem",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#e8a020",
              fontWeight: 600,
              marginBottom: "0.625rem",
            }}
          >
            Apply Today
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              margin: "0 0 0.75rem",
              lineHeight: 1.25,
            }}
          >
            Rental Application Form
          </h1>
          <p
            style={{
              fontSize: "1rem",
              opacity: 0.82,
              margin: 0,
              maxWidth: 560,
              lineHeight: 1.65,
            }}
          >
            Fill out the form below completely and accurately. All information
            is kept confidential and used only for the application review
            process.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginTop: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: "🔒", label: "Secure & Confidential" },
              { icon: "📋", label: "Quick 5-min Application" },
              { icon: "🏠", label: "Affordable Housing" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  fontSize: "0.8125rem",
                  opacity: 0.88,
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form */}
      <main
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "2rem 1.25rem 4rem",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(26,58,92,0.08)",
            border: "1px solid var(--color-border)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "1.75rem 2rem 0.5rem",
              borderBottom: "1px solid var(--color-surface-2)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  color: "var(--color-brand)",
                  margin: 0,
                }}
              >
                Tenant Information
              </h2>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-muted)",
                  background: "var(--color-surface)",
                  padding: "0.25rem 0.625rem",
                  borderRadius: 20,
                  border: "1px solid var(--color-border)",
                }}
              >
                All fields required unless noted
              </span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ padding: "1.75rem 2rem 2rem" }}
          >
            {/* Section 1: Personal */}
            <p className="section-title">Personal Details</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.125rem",
              }}
            >
              <div>
                <label className="field-label">Full Name</label>
                <input
                  className="field-input"
                  type="text"
                  placeholder="Jane Smith"
                  value={form.fullName}
                  onChange={set("fullName")}
                  required
                />
              </div>
              <div>
                <label className="field-label">Age</label>
                <input
                  className="field-input"
                  type="number"
                  placeholder="25"
                  min="18"
                  max="120"
                  value={form.age}
                  onChange={set("age")}
                  required
                />
              </div>
              <div>
                <label className="field-label">Email Address</label>
                <input
                  className="field-input"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={set("email")}
                  required
                />
              </div>
              <div>
                <label className="field-label">Phone Number</label>
                <input
                  className="field-input"
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={form.phone}
                  onChange={set("phone")}
                  required
                />
              </div>
              <div>
                <label className="field-label">Current ZIP Code</label>
                <input
                  className="field-input"
                  type="text"
                  placeholder="90210"
                  maxLength={10}
                  value={form.zipCode}
                  onChange={set("zipCode")}
                  required
                />
              </div>
            </div>

            <hr className="section-divider" />

            {/* Section 2: Background */}
            <p className="section-title">Background & Household</p>
            <div style={{ display: "grid", gap: "1.25rem" }}>
              <div>
                <label className="field-label">Any Criminal Records?</label>
                <div className="radio-group">
                  {["No", "Yes"].map((opt) => (
                    <label className="radio-option" key={opt}>
                      <input
                        type="radio"
                        name="criminalRecords"
                        value={opt}
                        checked={form.criminalRecords === opt}
                        onChange={set("criminalRecords")}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
                {form.criminalRecords === "Yes" && (
                  <div style={{ marginTop: "0.75rem" }}>
                    <label className="field-label">
                      Please provide details
                    </label>
                    <textarea
                      className="field-input"
                      rows={3}
                      placeholder="Please briefly describe the nature and date(s) of the offense(s)..."
                      value={form.criminalDetails}
                      onChange={set("criminalDetails")}
                      style={{ resize: "vertical" }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="field-label">Do You Have Pets?</label>
                <div className="radio-group">
                  {["No", "Yes"].map((opt) => (
                    <label className="radio-option" key={opt}>
                      <input
                        type="radio"
                        name="hasPets"
                        value={opt}
                        checked={form.hasPets === opt}
                        onChange={set("hasPets")}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
                {form.hasPets === "Yes" && (
                  <div style={{ marginTop: "0.75rem" }}>
                    <label className="field-label">
                      Type &amp; number of pets
                    </label>
                    <input
                      className="field-input"
                      type="text"
                      placeholder="e.g. 1 dog (Labrador, 45 lbs), 2 cats"
                      value={form.petsDetails}
                      onChange={set("petsDetails")}
                    />
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1.125rem",
                }}
              >
                <div>
                  <label className="field-label">Monthly Income ($)</label>
                  <input
                    className="field-input"
                    type="number"
                    placeholder="2500"
                    min="0"
                    value={form.monthlyIncome}
                    onChange={set("monthlyIncome")}
                    required
                  />
                </div>
                <div>
                  <label className="field-label">
                    How Many People Moving In?
                  </label>
                  <select
                    className="field-input"
                    value={form.peopleMovingIn}
                    onChange={set("peopleMovingIn")}
                    required
                  >
                    <option value="">Select...</option>
                    {["1", "2", "3", "4", "5", "6", "7+"].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === "1" ? "person" : "people"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <hr className="section-divider" />

            {/* Section 3: Referral & Tour */}
            <p className="section-title">Availability &amp; Referral</p>
            <div style={{ display: "grid", gap: "1.125rem" }}>
              <div>
                <label className="field-label">
                  How Did You Hear About Us?
                </label>
                <select
                  className="field-input"
                  value={form.hearAboutUs}
                  onChange={set("hearAboutUs")}
                  required
                >
                  <option value="">Select a source...</option>
                  {HEAR_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "1.125rem",
                }}
              >
                <div>
                  <label className="field-label">
                    When Will You Be Available for a House Tour?
                  </label>
                  <input
                    className="field-input"
                    type="datetime-local"
                    value={form.tourAvailability}
                    onChange={set("tourAvailability")}
                    required
                  />
                </div>
                <div>
                  <label className="field-label">
                    When Will You Pay the Application Fee?
                  </label>
                  <input
                    className="field-input"
                    type="date"
                    value={form.applicationFeeDate}
                    onChange={set("applicationFeeDate")}
                    required
                  />
                </div>
              </div>
            </div>

            <hr className="section-divider" />

            {/* Section 4: Payment */}
            <p className="section-title">Online Payment Method</p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-muted)",
                marginTop: -8,
                marginBottom: "1rem",
              }}
            >
              Select all that apply
            </p>
            <div className="checkbox-group">
              {PAYMENT_OPTIONS.map((method) => (
                <label className="checkbox-option" key={method}>
                  <input
                    type="checkbox"
                    checked={form.paymentMethods.includes(method)}
                    onChange={() => togglePayment(method)}
                  />
                  {method}
                </label>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "0.75rem 1rem",
                  background: "#fff5f5",
                  border: "1.5px solid #fca5a5",
                  borderRadius: 8,
                  color: "#b91c1c",
                  fontSize: "0.875rem",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <div style={{ marginTop: "2rem" }}>
              <button
                className="submit-btn"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "Submitting Application..."
                  : "Submit Rental Application"}
              </button>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-muted)",
                  textAlign: "center",
                  marginTop: "0.75rem",
                }}
              >
                By submitting, you confirm all information provided is accurate.
                A non-refundable application fee applies.
              </p>
            </div>
          </form>
        </div>

        {/* Info cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          {[
            {
              icon: "📞",
              title: "Questions?",
              body: "Call or text us at (800) 555-0190, Mon–Fri 9am–5pm.",
            },
            {
              icon: "⏱️",
              title: "Response Time",
              body: "We review applications within 1-2 business days.",
            },
            {
              icon: "💰",
              title: "Application Fee",
              body: "A $50 processing fee is collected before your tour.",
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background: "#fff",
                border: "1px solid var(--color-border)",
                borderRadius: 10,
                padding: "1.25rem",
              }}
            >
              <div style={{ fontSize: "1.375rem", marginBottom: "0.375rem" }}>
                {card.icon}
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "var(--color-brand)",
                  marginBottom: "0.25rem",
                }}
              >
                {card.title}
              </div>
              <div
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-muted)",
                  lineHeight: 1.55,
                }}
              >
                {card.body}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--color-border)",
          padding: "1.5rem 1.25rem",
          textAlign: "center",
          fontSize: "0.8125rem",
          color: "var(--color-muted)",
        }}
      >
        © {new Date().getFullYear()} Low Income Housing · All rights reserved ·
        Equal Housing Opportunity
      </footer>

      {/* Success Modal */}
      {success && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,25,47,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "1.25rem",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setSuccess(false)}
        >
          <div
            className="animate-scale-in"
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "3rem 2.5rem",
              maxWidth: 480,
              width: "100%",
              textAlign: "center",
              boxShadow: "0 24px 64px rgba(10,25,47,0.22)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "var(--color-success-bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-success)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.625rem",
                color: "var(--color-brand)",
                margin: "0 0 0.75rem",
              }}
            >
              Application Received!
            </h2>

            <p
              style={{
                color: "var(--color-muted)",
                lineHeight: 1.7,
                margin: "0 0 0.5rem",
                fontSize: "0.9375rem",
              }}
            >
              Thank you,{" "}
              <strong style={{ color: "var(--color-text)" }}>
                {form.fullName || "Applicant"}
              </strong>
              . Your rental application has been successfully submitted to{" "}
              <strong style={{ color: "var(--color-brand)" }}>
                Low Income Housing
              </strong>
              .
            </p>
            <p
              style={{
                color: "var(--color-muted)",
                lineHeight: 1.7,
                margin: "0 0 2rem",
                fontSize: "0.9375rem",
              }}
            >
              Our team will review your information and reach out within few
              hours to discuss next steps and schedule your house tour.
            </p>

            <div
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                padding: "0.875rem 1.125rem",
                fontSize: "0.8125rem",
                color: "var(--color-muted)",
                marginBottom: "1.75rem",
                textAlign: "left",
                lineHeight: 1.6,
              }}
            >
              <strong
                style={{
                  color: "var(--color-text)",
                  display: "block",
                  marginBottom: "0.25rem",
                }}
              >
                What's next?
              </strong>
              1. Confirmation email sent to your inbox
              <br />
              2. Application review (1-2 business days)
              <br />
              3. House tour scheduled at your available time
              <br />
              4. Application fee collected before tour
            </div>

            <button
              onClick={() => {
                setSuccess(false)
                setForm(INITIAL)
              }}
              className="submit-btn"
              style={{ width: "auto", padding: "0.75rem 2rem" }}
            >
              Close &amp; Start New Application
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
