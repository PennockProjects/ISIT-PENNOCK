/**
 * @author Charlie Calvert
 */

tools.factory('southernpacific', function() {
    this.SouthernPacific = (function() {
        var description = "I'm a Southern Pacific";
        
        function SouthernPacific() {
            
        }
        
        SouthernPacific.prototype.getNine = function() {
            return 99;
        };
        
        SouthernPacific.prototype.getDescription = function() {
            return description;
        };
        
        return SouthernPacific;       
    })();
    
    return new this.SouthernPacific();
});

