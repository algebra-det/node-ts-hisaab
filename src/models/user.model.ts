import mongoose, { InferSchemaType, mongo } from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserDocument extends mongoose.Document {
  name: string
  email: string
  password: string
  role: 'client' | 'admin'
  active: boolean
  createdAt: Date
  updatedAt: Date
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        message: 'Invalid email address format'
      }
    },
    password: {
      type: String,
      required: true,
      min: 6
    },
    role: {
      type: String,
      enum: ['client', 'admin'],
      default: 'client'
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)
// export type UserDocument = InferSchemaType<typeof UserSchema>

UserSchema.pre('save', async function (next) {
  let user = this as UserDocument
  if (!user.isModified('password')) return next()

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))
  const hash = bcrypt.hashSync(user.password, salt)

  user.password = hash
  return next()
})

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument
  try {
    const isSame = bcrypt.compare(candidatePassword, user.password)
    return isSame
  } catch (error) {
    return false
  }
}

const User = mongoose.model<UserDocument>('User', UserSchema)
export default User
