import { relations } from 'drizzle-orm'
import {
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

// Users
export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
})

// Users to Clinics
export const usersTableRelations = relations(usersTable, ({ many }) => ({
  usersToClinics: many(usersToClinicsTable),
}))

// Clinics
export const clinicsTable = pgTable('clinics', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// Users to Clinics
export const usersToClinicsTable = pgTable('users_to_clinics', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull(),
  clinicId: uuid('clinic_id')
    .references(() => clinicsTable.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// Users to Clinics Relations
export const usersToClinicsTableRelations = relations(
  usersToClinicsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [usersToClinicsTable.userId],
      references: [usersTable.id],
    }),
    clinic: one(clinicsTable, {
      fields: [usersToClinicsTable.clinicId],
      references: [clinicsTable.id],
    }),
  })
)

// Clinics table relations
export const clinicsTableRelation = relations(clinicsTable, ({ many }) => {
  return {
    doctors: many(doctorsTable),
    patients: many(patientsTable),
    appoitments: many(appoitmentsTable),
    usersToClinics: many(usersToClinicsTable),
  }
})

// Doctors
export const doctorsTable = pgTable('doctors', {
  id: uuid('id').defaultRandom().primaryKey(),
  clinicId: uuid('clinic_id')
    .references(() => clinicsTable.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(),
  avatarImageUrl: text('avatar_image_url'),
  specialty: text('specialty').notNull(),
  // 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday, 0 - Sunday
  availablefromWeekDay: integer('available_from_week_day').notNull(),
  availableToWeekDay: integer('available_to_week_day').notNull(),
  availableFromTime: time('available_from_time').notNull(),
  availableToTime: time('available_to_time').notNull(),
  appoitmentPriceInCents: integer('appoitment_price_in_cents').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// Doctors table relations
export const doctorsTableRelation = relations(doctorsTable, ({ many, one }) => {
  return {
    clinic: one(clinicsTable, {
      fields: [doctorsTable.clinicId],
      references: [clinicsTable.id],
    }),
    appoitments: many(appoitmentsTable),
  }
})

// Patient Sex Enum
export const pathientSexEnum = pgEnum('patient_sex', ['male', 'female'])

// Patients
export const patientsTable = pgTable('patients', {
  id: uuid('id').defaultRandom().primaryKey(),
  clinicId: uuid('clinic_id')
    .references(() => clinicsTable.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phone_number').notNull(),
  address: text('address').notNull(),
  sex: pathientSexEnum('sex').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// Patients table relations
export const patientsTableRelations = relations(
  patientsTable,
  ({ many, one }) => {
    return {
      clinic: one(clinicsTable, {
        fields: [patientsTable.clinicId],
        references: [clinicsTable.id],
      }),
      appoitments: many(appoitmentsTable),
    }
  }
)

// Appoitments
export const appoitmentsTable = pgTable('appoitments', {
  id: uuid('id').defaultRandom().primaryKey(),
  date: timestamp('date').notNull(),
  clinicId: uuid('clinic_id')
    .references(() => clinicsTable.id, { onDelete: 'cascade' })
    .notNull(),
  patientId: uuid('patient_id')
    .references(() => patientsTable.id, { onDelete: 'cascade' })
    .notNull(),
  doctorId: uuid('doctor_id')
    .references(() => doctorsTable.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// Appoitments table relations
export const appoitmentsTableRelations = relations(
  appoitmentsTable,
  ({ one }) => {
    return {
      clinic: one(clinicsTable, {
        fields: [appoitmentsTable.clinicId],
        references: [clinicsTable.id],
      }),
      patient: one(patientsTable, {
        fields: [appoitmentsTable.patientId],
        references: [patientsTable.id],
      }),
      doctor: one(doctorsTable, {
        fields: [appoitmentsTable.doctorId],
        references: [doctorsTable.id],
      }),
    }
  }
)
