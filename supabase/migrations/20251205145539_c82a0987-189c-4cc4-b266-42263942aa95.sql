-- Add update policy for resellers on licenses table
CREATE POLICY "Resellers can update their licenses" 
ON public.licenses 
FOR UPDATE 
USING ((auth.uid() = created_by) AND is_active_reseller(auth.uid()));