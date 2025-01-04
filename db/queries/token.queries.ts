import connectMongoDB from "@/db/mongodb";
import { PasswordResetTokenModel } from "@/models/PasswordResetTokenModel";
import { AuthTokenModel } from "@/models/TokenModel";

export const getPasswordResetTokenByToken = async (token: string) => {
    await connectMongoDB();

    try {
        const passwordToken = await PasswordResetTokenModel.findOne({ token });

        return passwordToken;
    } catch (error) {
        return null;
    }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
    await connectMongoDB();

    try {
        const passwordToken = await PasswordResetTokenModel.findOne({ email });

        return passwordToken;
    } catch (error) {
        return null;
    }
};

export const getAuthTokenByEmail = async (email: string) => {
    await connectMongoDB();

    try {
        const token = await AuthTokenModel.findOne({ email });

        return token;
    } catch (error) {
        return null;
    }
};
