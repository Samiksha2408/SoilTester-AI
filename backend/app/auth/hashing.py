import bcrypt 

class Hash:
    @staticmethod
    def hash_password(password: str) -> str: 
        """ 
        Hash a plain-text password using bcrypt. 
        """ 
        password_bytes = password.encode("utf-8") 

        # bcrypt has a 72-byte password limit.
        if len(password_bytes) > 72:
            raise ValueError("Password must be 72 bytes or fewer.") 

        hashed = bcrypt.hashpw( password_bytes, bcrypt.gensalt() 
        ) 

        return hashed.decode("utf-8")

    @staticmethod 
    def verify_password(password: str, hashed_password: str) -> bool: 
        """ 
        Verify a plain-text password against a bcrypt hash. 
        """ 

        password_bytes = password.encode("utf-8") 
        hashed_bytes = hashed_password.encode("utf-8") 

        if len(password_bytes) > 72: 
            return False 


        return bcrypt.checkpw( password_bytes, hashed_bytes
         )