
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { KeyRound, Eye, EyeOff, Check, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AppLayout from '@/components/layout/AppLayout';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if URL contains access_token for password reset
  const accessToken = searchParams.get('access_token');

  useEffect(() => {
    // Validate password match when confirm password changes
    if (confirmPassword) {
      setPasswordsMatch(newPassword === confirmPassword);
    } else {
      setPasswordsMatch(true);
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    // Validate password strength
    if (!newPassword) {
      setPasswordStrength(null);
      return;
    }

    const hasMinLength = newPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumbers = /[0-9]/.test(newPassword);
    const hasSpecialChars = /[^A-Za-z0-9]/.test(newPassword);
    
    const strength = 
      (hasMinLength ? 1 : 0) + 
      (hasUppercase ? 1 : 0) + 
      (hasLowercase ? 1 : 0) + 
      (hasNumbers ? 1 : 0) + 
      (hasSpecialChars ? 1 : 0);

    if (strength <= 2) setPasswordStrength('weak');
    else if (strength <= 4) setPasswordStrength('medium');
    else setPasswordStrength('strong');
    
  }, [newPassword]);

  // Function to update the password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordsMatch) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical.",
      });
      return;
    }
    
    if (passwordStrength === 'weak') {
      toast({
        variant: "destructive",
        title: "Password is too weak",
        description: "Please choose a stronger password.",
      });
      return;
    }

    if (!accessToken) {
      toast({
        variant: "destructive",
        title: "Invalid reset link",
        description: "The password reset link is invalid or has expired.",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      setResetSuccess(true);
      toast({
        title: "Password updated successfully!",
        description: "Your password has been reset. You can now log in with your new password.",
      });
      
      // Clear password fields
      setNewPassword('');
      setConfirmPassword('');
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/auth');
      }, 3000);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: error.message || "Failed to reset your password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Render password strength indicator
  const renderPasswordStrengthIndicator = () => {
    if (!passwordStrength) return null;
    
    const strengthClasses = {
      weak: "bg-red-500",
      medium: "bg-yellow-500",
      strong: "bg-green-500"
    };
    
    const strengthMessages = {
      weak: "Weak password",
      medium: "Medium strength",
      strong: "Strong password"
    };

    return (
      <div className="mt-2">
        <div className="flex items-center gap-2">
          <div className={`h-1 flex-1 rounded-full bg-gray-200 overflow-hidden`}>
            <div 
              className={`h-full ${strengthClasses[passwordStrength]} transition-all duration-300`} 
              style={{ 
                width: passwordStrength === 'weak' ? '33%' : 
                      passwordStrength === 'medium' ? '66%' : '100%' 
              }}
            />
          </div>
          <span className="text-xs text-gray-500">{strengthMessages[passwordStrength]}</span>
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <Card className="w-full max-w-md relative z-10 backdrop-filter backdrop-blur-sm bg-white/90">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-fileforge-blue flex items-center justify-center">
                <KeyRound className="text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {resetSuccess ? 'Password Updated!' : 'Reset Your Password'}
            </CardTitle>
            <CardDescription className="text-center">
              {resetSuccess 
                ? 'Your password has been reset successfully. Redirecting to login...' 
                : 'Create a new secure password for your account'}
            </CardDescription>
          </CardHeader>
          
          {!resetSuccess ? (
            <form onSubmit={handleResetPassword}>
              <CardContent className="space-y-4">
                {!accessToken && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <div className="flex gap-2 items-center text-amber-700">
                      <AlertTriangle size={16} className="flex-shrink-0" />
                      <p className="text-sm">Invalid or expired reset link. Please request a new password reset.</p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="pr-10 bg-white/80"
                      placeholder="Enter your new password"
                      disabled={!accessToken || loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      disabled={!accessToken || loading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {renderPasswordStrengthIndicator()}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className={`pr-10 bg-white/80 ${!passwordsMatch && confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Confirm your new password"
                      disabled={!accessToken || loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      disabled={!accessToken || loading}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {!passwordsMatch && confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">Passwords don't match</p>
                  )}
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-700">
                    Your password should have at least 8 characters, including uppercase and lowercase letters, numbers, and special characters.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full transition-all duration-200 hover:shadow-lg bg-gradient-to-r from-fileforge-blue to-fileforge-teal text-white"
                  disabled={!accessToken || loading || !passwordsMatch}
                >
                  {loading ? 'Updating Password...' : 'Update Password'}
                </Button>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="pt-4 pb-6">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-center text-gray-600">
                  Your password has been updated successfully. You will be redirected to the login page in a moment.
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}
