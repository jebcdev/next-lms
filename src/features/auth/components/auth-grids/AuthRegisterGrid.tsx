"use client";

import { useState } from "react";
import { Role } from "@/generated/prisma/enums";
import { getRoleLabel } from "@/lib/utils/enums-labels";
import { Button } from "@/features/shared/components/ui/button";
import { AdminRegisterForm } from "../admin";
import { InstructorRegisterForm } from "../instructor";
import { StudentRegisterForm } from "../student";

const ROLES = [Role.STUDENT, Role.INSTRUCTOR, Role.ADMIN];

interface Props {
    tenants: {
        id: string;
        name: string;
    }[];
}

export const AuthRegisterGrid = ({ tenants }: Props) => {
    const [selectedRole, setSelectedRole] = useState<Role>(
        Role.STUDENT,
    );

    return (
        <>
        <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ROLES.map((role) => (
                    <Button
                        key={role}
                        variant={
                            selectedRole === role
                                ? "default"
                                : "outline"
                        }
                        onClick={() => setSelectedRole(role)}
                        className="w-full"
                    >
                        {getRoleLabel(role)}
                    </Button>
                ))}
            </div>
            <div className="border rounded-lg p-4">
                {selectedRole === Role.ADMIN && <AdminRegisterForm />}
                {selectedRole === Role.INSTRUCTOR && (
                    <InstructorRegisterForm tenants={tenants} />
                )}
                {selectedRole === Role.STUDENT && (
                    <StudentRegisterForm tenants={tenants} />
                )}
            </div>
        </div>
        </>
    );
};
