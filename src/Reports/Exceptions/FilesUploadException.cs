using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Files.Exceptions
{
    public class FilesUploadException : Exception
    {
        public FilesUploadException(string message) : base (message)
        {

        }
    }
}
