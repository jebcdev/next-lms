"use client";

import { useState } from "react";
import { Role } from "@/generated/prisma/enums";
import { getRoleLabel } from "@/lib/utils/enums-labels";
import { Button } from "@/features/shared/components/ui/button";
import {
    SuperAdminLoginForm,
} from "../super-admin";
import { AdminLoginForm } from "../admin";
import { InstructorLoginForm } from "../instructor";
import { StudentLoginForm } from "../student";

const ROLES = [Role.STUDENT, Role.INSTRUCTOR, Role.ADMIN, Role.SUPER_ADMIN];

export const AuthLoginGrid = () => {
    const [selectedRole, setSelectedRole] = useState<Role>(Role.STUDENT);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ROLES.map((role) => (
                    <Button
                        key={role}
                        variant={selectedRole === role ? "default" : "outline"}
                        onClick={() => setSelectedRole(role)}
                        className="w-full"
                    >
                        {getRoleLabel(role)}
                    </Button>
                ))}
            </div>

            <div className="border rounded-lg p-4">
                {selectedRole === Role.SUPER_ADMIN && <SuperAdminLoginForm />}
                {selectedRole === Role.ADMIN && <AdminLoginForm />}
                {selectedRole === Role.INSTRUCTOR && <InstructorLoginForm />}
                {selectedRole === Role.STUDENT && <StudentLoginForm />}
            </div>
        </div>
    );
};