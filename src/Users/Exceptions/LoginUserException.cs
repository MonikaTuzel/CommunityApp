using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Users.Exceptions
{
    public class LoginUserException : Exception
    {
        public LoginUserException(string message) : base(message)
        {

        }    
    }
}
