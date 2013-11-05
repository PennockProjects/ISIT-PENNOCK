/**
 * @author Charlie Calvert
 */

tools.factory('santafe', function() {
    this.SantaFe = (function() {
        var description = "I'm a SantaFe.";
        
        function SantaFe() {
            
        }
        
        SantaFe.prototype.getDescription = function() {
            return description;
        };
        
        return SantaFe;
    })();
    
    return new this.SantaFe();
});


